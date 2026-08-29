import { NextRequest, NextResponse } from 'next/server'
import { sendMail, renderBrandedEmail, renderAcknowledgementEmail, formatReplyTo } from '@/lib/mail'
import { verifyRecaptcha } from '@/lib/recaptcha-verify'

/**
 * POST /api/enquiry
 * Handles the "Interested in this project?" form on project detail pages.
 */

interface EnquiryPayload {
  name: string
  email: string
  phone: string
  message: string
  projectName: string
  projectLocation: string
  recaptchaToken?: string
}

function isValidPayload(body: unknown): body is EnquiryPayload {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === 'string' && b.name.trim().length > 0 &&
    typeof b.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === 'string' && b.phone.trim().length > 0 &&
    typeof b.projectName === 'string' && b.projectName.trim().length > 0
  )
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

  if (!(await verifyRecaptcha(body.recaptchaToken, 'enquiry'))) {
    return NextResponse.json(
      { success: false, error: 'Spam check failed. Please try again.' },
      { status: 403 }
    )
  }

  const sent = await sendMail({
    replyTo: formatReplyTo(body.name, body.email),
    subject: `[CMR Project Enquiry] ${body.projectName} — ${body.name}`,
    text: [
      `Project: ${body.projectName} (${body.projectLocation})`,
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone}`,
      '',
      `Message:\n${body.message || '(none)'}`,
    ].join('\n'),
    html: renderBrandedEmail({
      eyebrow: 'Project Enquiry',
      heading: body.projectName,
      rows: [
        { label: 'Project', value: `${body.projectName} — ${body.projectLocation}` },
        { label: 'Name', value: body.name },
        { label: 'Email', value: body.email, href: `mailto:${body.email}` },
        { label: 'Phone', value: body.phone, href: `tel:${body.phone}` },
      ],
      message: body.message || '(none)',
      replyContact: { name: body.name, email: body.email },
    }),
  })

  if (!sent) {
    console.warn('[CMR Enquiry] SMTP not configured or failed. Enquiry data:')
    console.warn(JSON.stringify(body, null, 2))
  } else {
    const acknowledged = await sendMail({
      to: body.email,
      subject: `We've Received Your Enquiry — CMR Developers`,
      text: `Hi ${body.name},\n\nThank you for your enquiry about ${body.projectName} (${body.projectLocation}). Our team will get back to you shortly.\n\n— CMR Developers`,
      html: renderAcknowledgementEmail({
        name: body.name,
        contextLine: `your enquiry about ${body.projectName} — ${body.projectLocation}`,
      }),
    })
    if (!acknowledged) {
      console.warn(`[CMR Enquiry] Acknowledgement email to ${body.email} failed.`)
    }
  }

  return NextResponse.json({ success: true })
}
