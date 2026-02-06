import { supabase } from '../lib/supabase'
import { getTelegramUser } from '../utils/useTelegramUser'

export const ensurePlayer = async () => {
  const tgUser = getTelegramUser()
  if (!tgUser) throw new Error('No Telegram user')

  const payload = {
    tg_id: String(tgUser.tg_id),
    name: tgUser.name,
    username: tgUser.username,
    avatar_url: tgUser.avatar_url,
  }

  const { data, error } = await supabase
    .from('players')
    .upsert(payload, { onConflict: 'tg_id' })
    .select()
    .single()

  if (error) {
    console.error('ensurePlayer error:', error)
    throw error
  }

  return data // ← ВСЕГДА есть player.id
}