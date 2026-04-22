import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'

export async function findApiKeyByPrefix(prefix: string) {
  const { data, error } = await supabaseAdmin
    .from('api_keys_v2')
    .select('*')
    .ilike('key_prefix', `${prefix}%`)
    .limit(1)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function updateLastUsed(apiKeyId: string) {
  await supabaseAdmin
    .from('api_keys_v2')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', apiKeyId)
}
