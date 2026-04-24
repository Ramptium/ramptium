import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'

export type BillingQuotaDecision = {
  allowed: boolean
  plan: string
  status: string
  requestCount: number
  monthlyLimit: number
  remaining: number
  reason?: 'subscription_inactive' | 'quota_exceeded'
}

const DEFAULT_FREE_LIMIT = 100_000

export async function enforceBillingQuota(projectId: string): Promise<BillingQuotaDecision> {
  const month = `${new Date().toISOString().slice(0, 7)}-01`

  const { data: project } = await supabaseAdmin
    .from('projects')
    .select('organization_id')
    .eq('id', projectId)
    .maybeSingle()

  if (!project?.organization_id) {
    return {
      allowed: true,
      plan: 'free',
      status: 'active',
      requestCount: 0,
      monthlyLimit: DEFAULT_FREE_LIMIT,
      remaining: DEFAULT_FREE_LIMIT,
    }
  }

  const { data: subscription } = await supabaseAdmin
    .from('subscriptions_v2')
    .select('plan,status,monthly_request_limit')
    .eq('organization_id', project.organization_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const plan = subscription?.plan ?? 'free'
  const status = subscription?.status ?? 'active'
  const monthlyLimit = Number(subscription?.monthly_request_limit || DEFAULT_FREE_LIMIT)

  if (!['active', 'trialing'].includes(status)) {
    return {
      allowed: false,
      plan,
      status,
      requestCount: 0,
      monthlyLimit,
      remaining: 0,
      reason: 'subscription_inactive',
    }
  }

  const { data: usage } = await supabaseAdmin
    .from('usage_aggregates_monthly')
    .select('request_count')
    .eq('project_id', projectId)
    .eq('month', month)
    .maybeSingle()

  const requestCount = Number(usage?.request_count || 0)
  const remaining = Math.max(0, monthlyLimit - requestCount)

  return {
    allowed: requestCount < monthlyLimit,
    plan,
    status,
    requestCount,
    monthlyLimit,
    remaining,
    reason: requestCount >= monthlyLimit ? 'quota_exceeded' : undefined,
  }
}
