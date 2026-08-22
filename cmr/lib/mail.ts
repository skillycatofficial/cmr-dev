/**
 * Shared SMTP mail sender (Zoho or any SMTP provider via env vars).
 * Env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO, CONTACT_EMAIL_CC
 */

interface MailAttachment {
  filename: string
  content: Buffer
  contentType?: string
}

interface MailInput {
  subject: string
  text: string
  html: string
  replyTo?: string
  /** Overrides CONTACT_EMAIL_TO — used to send the customer-facing acknowledgement instead of the internal notification. */
  to?: string
  /** Overrides CONTACT_EMAIL_CC. Ignored (no CC) when `to` is also set, since acknowledgements shouldn't CC admin. */
  cc?: string
  attachments?: MailAttachment[]
}

export async function sendMail(payload: MailInput): Promise<boolean> {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = payload.to ?? (process.env.CONTACT_EMAIL_TO || 'info@cmrdevelopers.com')
  const cc = payload.to ? undefined : (payload.cc ?? process.env.CONTACT_EMAIL_CC)
  if (!host || !user || !pass) return false

  try {
    // @ts-expect-error nodemailer type declarations may not be installed
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.default.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"CMR Developers" <${user}>`,
      to,
      cc,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      attachments: payload.attachments,
    })
    return true
  } catch (err) {
    console.error('[CMR Mail] SMTP error:', err)
    return false
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Builds a `"Name" <email>` Reply-To header value, stripped of header-injection chars. */
export function formatReplyTo(name: string, email: string): string {
  const safeName = name.replace(/["\r\n]/g, '').trim()
  return `"${safeName}" <${email}>`
}

interface EmailRow {
  label: string
  value: string
  href?: string
}

const BRAND = {
  outerBg: '#EDEAE1',
  cardBg: '#F6F4EE',
  barBg: '#0F2F2B',
  gold: '#B89A5D',
  charcoal: '#1A1A1A',
  gray: '#8A8272',
  border: '#E7E3D8',
  ivory: '#F6F4EE',
}

const FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/** Wraps inner card content (eyebrow/heading/body) in the shared branded document shell. */
function emailShell(opts: { title: string; eyebrow: string; heading: string; innerHtml: string; footerText: string }): string {
  return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(opts.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" type="text/css">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  body { margin:0; padding:0; width:100% !important; background-color:${BRAND.outerBg} !important; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  @media print {
    /* Most print engines (incl. the one behind Zoho's print button) drop
       background-color by default unless the reader enables "print
       backgrounds" — force it where the browser allows, and separately
       flip header/footer text dark so it stays legible on white paper
       even when the background doesn't print. */
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    body { background-color:#FFFFFF !important; }
    .mail-card { border:1px solid ${BRAND.gray} !important; page-break-inside: avoid; }
    .hdr-bar, .ftr-bar { background-color:#FFFFFF !important; border-bottom:1px solid ${BRAND.gray}; }
    .ftr-bar { border-top:1px solid ${BRAND.gray} !important; border-bottom:none; }
    .hdr-text, .ftr-text { color:${BRAND.barBg} !important; opacity:1 !important; }
  }
</style>
</head>
<body bgcolor="${BRAND.outerBg}" style="margin:0;padding:0;background-color:${BRAND.outerBg};">
  <div style="background-color:${BRAND.outerBg};padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="mail-card" style="max-width:560px;margin:0 auto;background-color:${BRAND.cardBg};border:1px solid ${BRAND.border};">
      <tr>
        <td bgcolor="${BRAND.barBg}" class="hdr-bar" style="background-color:${BRAND.barBg};padding:28px 32px;">
          <span class="hdr-text" style="font-family:${FONT_STACK};font-size:18px;font-weight:600;letter-spacing:2px;color:${BRAND.ivory} !important;text-transform:uppercase;">CMR Developers</span>
        </td>
      </tr>
      <tr>
        <td bgcolor="${BRAND.gold}" style="height:3px;background-color:${BRAND.gold};line-height:3px;font-size:0;">&nbsp;</td>
      </tr>
      <tr>
        <td bgcolor="${BRAND.cardBg}" style="background-color:${BRAND.cardBg};padding:32px;">
          <p style="margin:0 0 4px;font-family:${FONT_STACK};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.gold} !important;">${escapeHtml(opts.eyebrow)}</p>
          <h1 style="margin:0 0 24px;font-family:${FONT_STACK};font-size:24px;font-weight:600;letter-spacing:0.2px;color:${BRAND.barBg} !important;">${escapeHtml(opts.heading)}</h1>
          ${opts.innerHtml}
        </td>
      </tr>
      <tr>
        <td bgcolor="${BRAND.barBg}" class="ftr-bar" style="background-color:${BRAND.barBg};padding:20px 32px;border-top:1px solid ${BRAND.border};">
          <p class="ftr-text" style="margin:0;font-family:${FONT_STACK};font-size:12px;color:${BRAND.ivory} !important;opacity:0.75;">${escapeHtml(opts.footerText)}</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`
}

/**
 * Renders the internal enquiry-notification email (sent to info@/admin@) —
 * a field/value table plus the raw message.
 */
export function renderBrandedEmail(opts: {
  eyebrow: string
  heading: string
  rows: EmailRow[]
  message?: string
  replyContact?: { name: string; email: string }
}): string {
  const rowsHtml = opts.rows
    .map(
      (r) => `
      <tr>
        <td bgcolor="${BRAND.cardBg}" style="padding:12px 0;border-bottom:1px solid ${BRAND.border};width:140px;vertical-align:top;background-color:${BRAND.cardBg};">
          <span style="font-family:${FONT_STACK};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.gray} !important;">${escapeHtml(r.label)}</span>
        </td>
        <td bgcolor="${BRAND.cardBg}" style="padding:12px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;background-color:${BRAND.cardBg};">
          <span style="font-family:${FONT_STACK};font-size:15px;font-weight:500;color:${BRAND.charcoal} !important;">
            ${r.href ? `<a href="${escapeHtml(r.href)}" style="color:${BRAND.charcoal} !important;text-decoration:none;">${escapeHtml(r.value)}</a>` : escapeHtml(r.value)}
          </span>
        </td>
      </tr>`
    )
    .join('')

  const messageHtml = opts.message
    ? `
      <tr>
        <td colspan="2" bgcolor="${BRAND.cardBg}" style="padding-top:20px;background-color:${BRAND.cardBg};">
          <div style="border-left:3px solid ${BRAND.gold};padding:4px 0 4px 16px;">
            <p style="margin:0 0 6px;font-family:${FONT_STACK};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.gray} !important;">Message</p>
            <p style="margin:0;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${BRAND.charcoal} !important;white-space:pre-wrap;">${escapeHtml(opts.message)}</p>
          </div>
        </td>
      </tr>`
    : ''

  // Reply-To headers aren't exposed as a clickable action in every mail
  // client/view (e.g. Zoho's print/reading-pane view has no Reply button at
  // all), so a mailto CTA is embedded directly in the content as a fallback.
  const ctaHtml = opts.replyContact
    ? `
      <tr>
        <td colspan="2" bgcolor="${BRAND.cardBg}" style="padding-top:28px;background-color:${BRAND.cardBg};">
          <a href="mailto:${escapeHtml(opts.replyContact.email)}" style="display:inline-block;background-color:${BRAND.gold};color:${BRAND.barBg} !important;font-family:${FONT_STACK};font-size:13px;font-weight:600;letter-spacing:0.3px;text-decoration:none;padding:12px 26px;">Reply to ${escapeHtml(opts.replyContact.name)}</a>
        </td>
      </tr>`
    : ''

  return emailShell({
    title: opts.heading,
    eyebrow: opts.eyebrow,
    heading: opts.heading,
    innerHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rowsHtml}
        ${messageHtml}
        ${ctaHtml}
      </table>`,
    footerText: 'This enquiry was submitted via the CMR Developers website. Reply directly to this email, or use the button above, to respond to the enquirer.',
  })
}

/**
 * Renders the customer-facing acknowledgement sent back to whoever submitted
 * a form — confirms receipt so they're not left wondering if it went through.
 */
export function renderAcknowledgementEmail(opts: { name: string; contextLine: string }): string {
  const innerHtml = `
    <p style="margin:0 0 16px;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${BRAND.charcoal} !important;">
      Thank you for reaching out to CMR Developers. We've received ${escapeHtml(opts.contextLine)}, and a member of our team will get back to you shortly.
    </p>
    <p style="margin:0;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${BRAND.charcoal} !important;">
      In the meantime, if you'd like to reach us directly, reply to this email or write to
      <a href="mailto:info@cmrdevelopers.com" style="color:${BRAND.barBg} !important;font-weight:600;text-decoration:none;">info@cmrdevelopers.com</a>.
    </p>`

  return emailShell({
    title: 'Enquiry Received',
    eyebrow: 'Enquiry Received',
    heading: `Thank You, ${opts.name}`,
    innerHtml,
    footerText: 'This is an automated confirmation from the CMR Developers website.',
  })
}
