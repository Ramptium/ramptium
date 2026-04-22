export type RequestEventWriteInput = {
  requestId: string
  projectId: string
  apiKeyId: string
  chain: string
  network: string
  method: string
  responseStatus?: number
  upstreamStatus?: number
  providerName?: string
  endpointId?: string
  latencyMs?: number
  retryCount: number
  errorClass?: string
  billableUnits: number
  billable: boolean
}

export type RequestEventWriteResult = {
  requestEventId: string
  billable: boolean
  billableUnits: number
}
