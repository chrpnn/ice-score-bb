import { supabase } from '../lib/supabase'

// получить профиль игрока
export const getPlayerProfile = async (tg_id) => {
  const { data, error } = await supabase
    .from('players')
    .select('position, favorite_team')
    .eq('tg_id', tg_id)
    .single()

  if (error) {
    console.error('getPlayerProfile error:', error)
    throw error
  }

  return data
}

// обновить профиль
export const updatePlayerProfile = async (tg_id, profileData) => {
  const { data, error } = await supabase
    .from('players')
    .update({
      position: profileData.position,
      favorite_team: profileData.favoriteTeam,
    })
    .eq('tg_id', tg_id)
    .select()
    .single()

  if (error) {
    console.error('updatePlayerProfile error:', error)
    throw error
  }

  return data
}
