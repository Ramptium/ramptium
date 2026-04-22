export type RateLimitReason =
  | 'ok'
  | 'burst_exceeded'
  | 'sustained_exceeded'
  | 'quota_exceeded'
  | 'ip_blocked'

export type RateLimitDecision = {
  allowed: boolean
  reason: RateLimitReason
  retryAfterSeconds?: number
  costUnits: number
}

export type RateLimitInput = {
  projectId: string
  apiKeyId: string
  clientIp?: string
  chain: string
  method: string
  profileId?: string | null
}
