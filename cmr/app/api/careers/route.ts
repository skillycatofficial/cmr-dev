import { NextRequest, NextResponse } from 'next/server'
import { sendMail, renderBrandedEmail, renderAcknowledgementEmail, formatReplyTo } from '@/lib/mail'

/**
 * POST /api/careers
 * Handles job application submissions (multipart/form-data, CV attached) from the Careers page.
 */

const MAX_RESUME_BYTES = 5 * 1024 * 1024 // 5MB — comfortably under typical SMTP attachment limits

type ResumeKind = 'pdf' | 'doc' | 'docx'

const RESUME_TYPE_INFO: Record<ResumeKind, { contentType: string; extension: string }> = {
  pdf: { contentType: 'application/pdf', extension: '.pdf' },
  doc: { contentType: 'application/msword', extension: '.doc' },
  docx: {
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    extension: '.docx',
  },
}

/**
 * Detects the real file type from its binary signature — never trust the
 * client-supplied filename or Content-Type, both of which are attacker-
 * controlled (e.g. `curl -F "resume=@evil;type=application/pdf"` sails
 * straight through a check that only looks at the declared MIME type).
 * Also does a light structural-completeness check per type so truncated/
 * corrupted uploads are rejected rather than silently forwarded.
 */
function detectResumeKind(buf: Buffer): ResumeKind | null {
  if (buf.length < 8) return null

  // PDF: "%PDF-" header, and the trailer marker must appear near the end —
  // a file that's missing %%EOF was cut off mid-transfer/corrupted.
  if (buf.subarray(0, 5).toString('latin1') === '%PDF-') {
    const tail = buf.subarray(Math.max(0, buf.length - 2048)).toString('latin1')
    return tail.includes('%%EOF') ? 'pdf' : null
  }

  // Legacy .doc: OLE Compound File Binary Format signature.
  const OLE_SIGNATURE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])
  if (buf.subarray(0, 8).equals(OLE_SIGNATURE)) {
    return 'doc'
  }

  // .docx is a ZIP container — the local-file-header signature alone would
  // also match a renamed .zip/.jar/.apk, so additionally require the OOXML
  // word-document part's name to actually appear in the archive, and require
  // a ZIP end-of-central-directory record near the end (rules out truncated
  // uploads, same idea as the PDF trailer check above).
  const ZIP_LOCAL_HEADER = Buffer.from([0x50, 0x4b, 0x03, 0x04])
  if (buf.subarray(0, 4).equals(ZIP_LOCAL_HEADER)) {
    const hasWordPart = buf.includes(Buffer.from('word/document.xml'))
    const tail = buf.subarray(Math.max(0, buf.length - 2048))
    const hasEndOfCentralDir = tail.includes(Buffer.from([0x50, 0x4b, 0x05, 0x06]))
    return hasWordPart && hasEndOfCentralDir ? 'docx' : null
  }

  return null
}

/** Rebuilds a safe attachment filename: no path components, no control/header-injection chars, extension forced to match the detected (not claimed) type. */
function sanitizeFilename(originalName: string, extension: string): string {
  const base = originalName.split(/[\\/]/).pop() ?? 'resume'
  const stem = base
    .replace(/\.[^.]*$/, '')
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/[^a-zA-Z0-9 ._-]/g, '')
    .trim()
    .slice(0, 80)
  return `${stem || 'resume'}${extension}`
}

/** Strips control/CR/LF characters so form text can't smuggle extra headers into the outgoing email (e.g. via the Subject line). */
function stripHeaderUnsafe(value: string): string {
  return value.replace(/[\x00-\x1f\x7f]/g, '').trim()
}

interface CareersFields {
  position: string
  name: string
  email: string
  phone: string
  message: string
}

function readFields(form: FormData): CareersFields | null {
  const position = form.get('position')
  const name = form.get('name')
  const email = form.get('email')
  const phone = form.get('phone')
  const message = form.get('message')

  if (
    typeof position !== 'string' || position.trim().length === 0 ||
    typeof name !== 'string' || name.trim().length === 0 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof phone !== 'string' || phone.trim().length === 0 ||
    typeof message !== 'string'
  ) {
    return null
  }

  return {
    position: stripHeaderUnsafe(position),
    name: stripHeaderUnsafe(name),
    email,
    phone: stripHeaderUnsafe(phone),
    message,
  }
}

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 })
  }

  const fields = readFields(form)
  if (!fields) {
    return NextResponse.json(
      { success: false, error: 'Missing or invalid required fields' },
      { status: 422 }
    )
  }

  const resumeField = form.get('resume')
  if (!(resumeField instanceof File) || resumeField.size === 0) {
    return NextResponse.json({ success: false, error: 'Please attach your CV.' }, { status: 422 })
  }
  if (resumeField.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ success: false, error: 'CV file is too large. Please keep it under 5MB.' }, { status: 422 })
  }

  const resumeBuffer = Buffer.from(await resumeField.arrayBuffer())
  const resumeKind = detectResumeKind(resumeBuffer)
  if (!resumeKind) {
    return NextResponse.json(
      { success: false, error: "The uploaded file doesn't appear to be a valid, complete PDF or Word document." },
      { status: 422 }
    )
  }

  const { contentType, extension } = RESUME_TYPE_INFO[resumeKind]
  const resumeFilename = sanitizeFilename(resumeField.name, extension)

  const sent = await sendMail({
    replyTo: formatReplyTo(fields.name, fields.email),
    subject: `[CMR Careers] ${fields.position} — ${fields.name}`,
    text: [
      `Position: ${fields.position}`,
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone}`,
      `Resume: attached (${resumeFilename})`,
      '',
      `Message:\n${fields.message || '(none)'}`,
    ].join('\n'),
    html: renderBrandedEmail({
      eyebrow: 'Job Application',
      heading: fields.position,
      rows: [
        { label: 'Position', value: fields.position },
        { label: 'Name', value: fields.name },
        { label: 'Email', value: fields.email, href: `mailto:${fields.email}` },
        { label: 'Phone', value: fields.phone, href: `tel:${fields.phone}` },
        { label: 'Resume', value: `${resumeFilename} (attached)` },
      ],
      message: fields.message || '(none)',
      replyContact: { name: fields.name, email: fields.email },
    }),
    attachments: [{ filename: resumeFilename, content: resumeBuffer, contentType }],
  })

  if (!sent) {
    console.warn('[CMR Careers] SMTP not configured or failed. Application data:')
    console.warn(JSON.stringify({ ...fields, resume: resumeFilename }, null, 2))
  } else {
    const acknowledged = await sendMail({
      to: fields.email,
      subject: `We've Received Your Application — CMR Developers`,
      text: `Hi ${fields.name},\n\nThank you for applying for ${fields.position} at CMR Developers. Our team will review your application and get back to you if there's a fit.\n\n— CMR Developers`,
      html: renderAcknowledgementEmail({
        name: fields.name,
        contextLine: `your application for ${fields.position}`,
      }),
    })
    if (!acknowledged) {
      console.warn(`[CMR Careers] Acknowledgement email to ${fields.email} failed.`)
    }
  }

  return NextResponse.json({ success: true })
}
