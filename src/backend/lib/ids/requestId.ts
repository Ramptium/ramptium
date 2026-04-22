export function generateRequestId(): string {
  const random = crypto.getRandomValues(new Uint8Array(12))
  return Array.from(random, (b) => b.toString(16).padStart(2, '0')).join('')
}
