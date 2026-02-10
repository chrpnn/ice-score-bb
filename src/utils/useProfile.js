import { supabase } from '../lib/supabase'

// Получение профиля игрока
export const getPlayerProfile = async (tg_id) => {
  console.log('getPlayerProfile вызван с tg_id:', tg_id)
  
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('tg_id', tg_id)
    .single()

  if (error) {
    console.error('getPlayerProfile error:', error)
    throw error
  }

  console.log('Профиль получен:', data)
  return data
}

// Обновление профиля игрока
export const updatePlayerProfile = async (tg_id, profileData) => {
  console.log('updatePlayerProfile вызван с:', { tg_id, profileData })
  
  const { data, error } = await supabase
    .from('players')
    .upsert({
      tg_id: tg_id,
      position: profileData.position,
      favorite_team: profileData.favoriteTeam,
    }, {
      onConflict: 'tg_id',
    })
    .select()
    .single()

  if (error) {
    console.error('updatePlayerProfile error:', error)
    throw error
  }

  console.log('Профиль обновлён:', data)
  return data
}
