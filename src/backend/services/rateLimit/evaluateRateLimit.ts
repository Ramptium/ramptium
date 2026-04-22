import type { RateLimitDecision, RateLimitInput } from '@/backend/contracts/rateLimit'

const memoryStore = new Map<string, { count: number; ts: number }>()
const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 100

export async function evaluateRateLimit(input: RateLimitInput): Promise<RateLimitDecision> {
  const key = `${input.projectId}:${input.apiKeyId}`
  const now = Date.now()

  const entry = memoryStore.get(key)

  if (!entry) {
    memoryStore.set(key, { count: 1, ts: now })
    return { allowed: true, reason: 'ok', costUnits: 1 }
  }

  if (now - entry.ts > WINDOW_MS) {
    memoryStore.set(key, { count: 1, ts: now })
    return { allowed: true, reason: 'ok', costUnits: 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, reason: 'burst_exceeded', costUnits: 0 }
  }

  entry.count += 1

  return { allowed: true, reason: 'ok', costUnits: 1 }
}
