import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'
import type { RequestEventWriteInput, RequestEventWriteResult } from '@/backend/contracts/requestEvents'

export async function writeRequestEvent(input: RequestEventWriteInput): Promise<RequestEventWriteResult> {
  const { data, error } = await supabaseAdmin
    .from('request_events')
    .insert({
      request_id: input.requestId,
      project_id: input.projectId,
      api_key_id: input.apiKeyId,
      chain: input.chain,
      network: input.network,
      rpc_method: input.method,
      response_status: input.responseStatus,
      upstream_status: input.upstreamStatus,
      upstream_provider: input.providerName,
      upstream_endpoint_id: input.endpointId,
      latency_ms: input.latencyMs,
      retry_count: input.retryCount,
      error_class: input.errorClass,
      billable_units: input.billableUnits,
      billable: input.billable,
      auth_result: 'ok',
      rate_limit_result: 'ok',
    })
    .select('id')
    .single()

  if (error || !data) {
    throw new Error('Failed to write request event')
  }

  return {
    requestEventId: data.id,
    billable: input.billable,
    billableUnits: input.billableUnits,
  }
}
