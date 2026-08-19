import { NextRequest, NextResponse } from 'next/server'
import { sendMail, renderBrandedEmail, renderAcknowledgementEmail, formatReplyTo } from '@/lib/mail'

/**
 * POST /api/contact
 * Handles enquiry form submissions from the Contact Us page.
 *
 * Strategy (in order):
 *  1. Forward to WordPress Contact Form 7 if WP_CF7_URL is set
 *  2. Send via SMTP (nodemailer) if SMTP_HOST is set
 *  3. Log to console (development fallback — data is never silently lost)
 *
 * Environment variables (add to .env.local or Vercel settings):
 *  CONTACT_EMAIL_TO       — where to send enquiries (e.g. admin@cmrdevelopers.com)
 *  SMTP_HOST              — SMTP host (e.g. smtp.gmail.com)
 *  SMTP_PORT              — SMTP port (default 587)
 *  SMTP_USER              — SMTP username
 *  SMTP_PASS              — SMTP password
 *  WP_CF7_FORM_ID         — WordPress CF7 form ID (optional)
 */

interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
  buyerType: 'Local' | 'NRI'
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === 'string' && b.name.trim().length > 0 &&
    typeof b.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === 'string' && b.phone.trim().length > 0 &&
    typeof b.message === 'string' && b.message.trim().length > 0 &&
    (b.buyerType === 'Local' || b.buyerType === 'NRI')
  )
}

async function sendViaWordPress(payload: ContactPayload): Promise<boolean> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL
  const formId = process.env.WP_CF7_FORM_ID
  if (!wpUrl || !formId) return false

  try {
    const formData = new FormData()
    formData.append('your-name', payload.name)
    formData.append('your-email', payload.email)
    formData.append('your-phone', payload.phone)
    formData.append('your-message', payload.message)
    formData.append('buyer-type', payload.buyerType)

    const res = await fetch(`${wpUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return data?.status === 'mail_sent'
  } catch {
    return false
  }
}

async function sendViaSMTP(payload: ContactPayload): Promise<boolean> {
  return sendMail({
    replyTo: formatReplyTo(payload.name, payload.email),
    subject: `[CMR Enquiry] ${payload.buyerType} — ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Buyer Type: ${payload.buyerType}`,
      '',
      `Message:\n${payload.message}`,
    ].join('\n'),
    html: renderBrandedEmail({
      eyebrow: `${payload.buyerType} Buyer Enquiry`,
      heading: payload.name,
      rows: [
        { label: 'Name', value: payload.name },
        { label: 'Email', value: payload.email, href: `mailto:${payload.email}` },
        { label: 'Phone', value: payload.phone, href: `tel:${payload.phone}` },
        { label: 'Buyer Type', value: payload.buyerType },
      ],
      message: payload.message,
      replyContact: { name: payload.name, email: payload.email },
    }),
  })
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { success: false, error: 'Missing or invalid required fields' },
      { status: 422 }
    )
  }

  // Rate-limit hint via header — real rate limiting should be done at edge/middleware level
  const forwarded = req.headers.get('x-forwarded-for') ?? 'unknown'
  console.info(`[CMR Contact] Enquiry from ${forwarded} — ${body.name} (${body.buyerType})`)

  // Attempt delivery channels in priority order
  const sentViaWP   = await sendViaWordPress(body)
  const sentViaSMTP = sentViaWP ? false : await sendViaSMTP(body)

  if (!sentViaWP && !sentViaSMTP) {
    // Development / unconfigured: log full payload so no data is lost
    console.warn('[CMR Contact] No delivery channel configured. Enquiry data:')
    console.warn(JSON.stringify(body, null, 2))
    // Still return 200 to the user — configure env vars for actual delivery
  } else {
    const acknowledged = await sendMail({
      to: body.email,
      subject: `We've Received Your Enquiry — CMR Developers`,
      text: `Hi ${body.name},\n\nThank you for your enquiry. Our team will get back to you shortly.\n\n— CMR Developers`,
      html: renderAcknowledgementEmail({ name: body.name, contextLine: 'your enquiry' }),
    })
    if (!acknowledged) {
      console.warn(`[CMR Contact] Acknowledgement email to ${body.email} failed.`)
    }
  }

  return NextResponse.json({ success: true })
}
