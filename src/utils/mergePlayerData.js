import { getPlayerProfile } from '@/utils/useProfile'

export const mergePlayerData = async (statsData) => {
  const mergedPlayers = []

  for (const player of statsData) {
    try {
      // Получаем профиль из таблицы players
      const profile = await getPlayerProfile(player.tg_id)

      mergedPlayers.push({
        ...player,
        position: profile?.position || 'Не указано',
        favorite_team: profile?.favorite_team || 'Не указано',
        // Можно добавить другие поля из профиля
      })
    } catch {
      // Если профиля нет, используем только stats данные
      mergedPlayers.push({
        ...player,
        position: 'Не указано',
        favorite_team: 'Не указано',
      })
    }
  }

  return mergedPlayers
}