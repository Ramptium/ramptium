import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'
import type { UsageAggregateUpdateInput } from '@/backend/contracts/usage'

export async function updateUsageAggregates(input: UsageAggregateUpdateInput) {
  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  const month = `${date.slice(0, 7)}-01`

  const dailyKey = {
    project_id: input.projectId,
    api_key_id: input.apiKeyId ?? null,
    date,
    chain: input.chain,
  }

  const { data: existingDaily } = await supabaseAdmin
    .from('usage_aggregates_daily')
    .select('id, request_count, success_count, error_count, billable_units')
    .match(dailyKey)
    .maybeSingle()

  if (existingDaily) {
    const { error } = await supabaseAdmin
      .from('usage_aggregates_daily')
      .update({
        request_count: (existingDaily.request_count ?? 0) + input.requestCount,
        success_count: (existingDaily.success_count ?? 0) + input.successCount,
        error_count: (existingDaily.error_count ?? 0) + input.errorCount,
        billable_units: (existingDaily.billable_units ?? 0) + input.billableUnits,
        updated_at: now.toISOString(),
      })
      .eq('id', existingDaily.id)
    if (error) throw new Error('Failed to update daily usage aggregate')
  } else {
    const { error } = await supabaseAdmin.from('usage_aggregates_daily').insert({
      ...dailyKey,
      request_count: input.requestCount,
      success_count: input.successCount,
      error_count: input.errorCount,
      billable_units: input.billableUnits,
      latency_p50: input.latencyMs ?? null,
      latency_p95: input.latencyMs ?? null,
      latency_p99: input.latencyMs ?? null,
    })
    if (error) throw new Error('Failed to insert daily usage aggregate')
  }

  const monthlyKey = {
    project_id: input.projectId,
    month,
  }

  const { data: existingMonthly } = await supabaseAdmin
    .from('usage_aggregates_monthly')
    .select('id, request_count, success_count, error_count, billable_units')
    .match(monthlyKey)
    .maybeSingle()

  if (existingMonthly) {
    const { error } = await supabaseAdmin
      .from('usage_aggregates_monthly')
      .update({
        request_count: (existingMonthly.request_count ?? 0) + input.requestCount,
        success_count: (existingMonthly.success_count ?? 0) + input.successCount,
        error_count: (existingMonthly.error_count ?? 0) + input.errorCount,
        billable_units: (existingMonthly.billable_units ?? 0) + input.billableUnits,
        updated_at: now.toISOString(),
      })
      .eq('id', existingMonthly.id)
    if (error) throw new Error('Failed to update monthly usage aggregate')
  } else {
    const { error } = await supabaseAdmin.from('usage_aggregates_monthly').insert({
      ...monthlyKey,
      request_count: input.requestCount,
      success_count: input.successCount,
      error_count: input.errorCount,
      billable_units: input.billableUnits,
    })
    if (error) throw new Error('Failed to insert monthly usage aggregate')
  }

  return { success: true }
}
