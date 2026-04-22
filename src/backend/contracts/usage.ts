export type UsageAggregateUpdateInput = {
  projectId: string
  apiKeyId?: string | null
  chain: string
  requestCount: number
  successCount: number
  errorCount: number
  billableUnits: number
  latencyMs?: number
}

export type UsageAggregateResult = {
  success: boolean
}
