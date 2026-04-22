import type { RateLimitDecision, RateLimitInput } from '@/backend/contracts/rateLimit'

export async function evaluateRateLimit(input: RateLimitInput): Promise<RateLimitDecision> {
  // v1: allow all, placeholder for real limiter (Redis / sliding window)
  return {
    allowed: true,
    reason: 'ok',
    costUnits: 1,
  }
}
