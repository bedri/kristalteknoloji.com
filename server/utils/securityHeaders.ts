export const SECURITY_HEADERS: Readonly<Record<string, string>> = Object.freeze({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), microphone=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'"
})

export function getSecurityHeaders(): Record<string, string> {
  return { ...SECURITY_HEADERS }
}
