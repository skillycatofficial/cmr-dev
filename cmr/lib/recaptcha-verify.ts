interface SiteVerifyResponse {
  success: boolean
  score?: number
  action?: string
  'error-codes'?: string[]
}

const SCORE_THRESHOLD = 0.5

/**
 * Verifies a reCAPTCHA v3 token server-side. Fails open (returns true) when
 * RECAPTCHA_SECRET_KEY isn't configured, so forms keep working until the key
 * is added, and when Google's endpoint itself is unreachable, so a transient
 * outage doesn't block real customer enquiries.
 */
export async function verifyRecaptcha(token: unknown, action: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true
  if (typeof token !== 'string' || !token) return false

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = (await res.json()) as SiteVerifyResponse
    return data.success === true && data.action === action && (data.score ?? 0) >= SCORE_THRESHOLD
  } catch (err) {
    console.warn('[reCAPTCHA] Verification request failed, allowing submission:', err)
    return true
  }
}
