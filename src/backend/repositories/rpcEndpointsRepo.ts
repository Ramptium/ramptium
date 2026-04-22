import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'

export type RpcEndpointRecord = {
  id: string
  provider_name: string
  chain: string
  network: string
  endpoint_url: string
  auth_secret_ref: string | null
  region: string | null
  priority_weight: number
  cost_weight: number
  active: boolean
}

export async function listActiveEndpointsByChainNetwork(chain: string, network: string) {
  const { data, error } = await supabaseAdmin
    .from('rpc_endpoints')
    .select('*')
    .eq('chain', chain)
    .eq('network', network)
    .eq('active', true)

  if (error || !data) {
    return [] as RpcEndpointRecord[]
  }

  return data as RpcEndpointRecord[]
}
