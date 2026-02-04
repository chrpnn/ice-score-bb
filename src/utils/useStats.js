import { supabase } from '../lib/supabase'

export const addStat = async ({
  tg_id,
  name,
  username,
  avatar_url = null,
  goals,
  assists,
  game_day,
}) => {
  const { data, error } = await supabase
    .from('stats')
    .insert({
      tg_id,
      name,
      username,
      avatar_url,
      goals,
      assists,
      game_day,
      game_counter: 1,
      created_at: new Date(),
    })
    .select()
    .single()

  if (error) {
    console.error('addStat error:', error)
    throw error
  }

  return data
}

export const deleteStat = async (id) => {
  const { error } = await supabase.from('stats').delete().eq('id', id)

  if (error) {
    console.error('deleteStat error:', error)
    throw error
  }

  return true
}