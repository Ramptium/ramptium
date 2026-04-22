const KEY_PREFIX = 'rpt'

const encoder = new TextEncoder()

export function generateApiKey(environment: 'test' | 'live'): string {
  const prefix = `${KEY_PREFIX}_${environment}`
  const random = crypto.getRandomValues(new Uint8Array(24))
  const token = Array.from(random, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${prefix}_${token}`
}

export function extractKeyPrefix(rawKey: string): string {
  const parts = rawKey.split('_')
  if (parts.length < 3) {
    throw new Error('Malformed API key')
  }
  return parts.slice(0, 2).join('_')
}

export async function hashApiKey(rawKey: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(rawKey))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function safeCompareHash(rawKey: string, storedHash: string): Promise<boolean> {
  const computed = await hashApiKey(rawKey)
  return computed === storedHash
}
