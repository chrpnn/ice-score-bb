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

  // Обновляем счетчик игр в players
  const { error: updateError } = await supabase.rpc('increment_games_played', {
    player_tg_id: tg_id,
  })

  if (updateError) {
    console.error('addStat increment error:', updateError)
    throw updateError
  }

  return data
}

export const deleteStat = async (id) => {
  try {
    // Сначала получаем tg_id записи, которую удаляем
    const { data: statData, error: fetchError } = await supabase
      .from('stats')
      .select('tg_id')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('deleteStat fetch error:', fetchError)
      throw fetchError
    }

    // Удаляем запись из stats
    const { error } = await supabase.from('stats').delete().eq('id', id)

    if (error) {
      console.error('deleteStat delete error:', error)
      throw error
    }

    // Уменьшаем счетчик игр в players
    const { error: updateError } = await supabase.rpc('decrement_games_played', {
      player_tg_id: statData.tg_id,
    })

    if (updateError) {
      console.error('deleteStat decrement error:', updateError)
      throw updateError
    }

    return true
  } catch (error) {
    console.error('deleteStat transaction error:', error)
    throw error
  }
}
