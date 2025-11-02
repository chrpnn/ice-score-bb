import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useStatsStore = defineStore('stats', () => {
  const players = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null

    const { data, error: supaError } = await supabase
      .from('stats')
      .select('id, tg_id, name, username, goals, assists, game_counter')

    if (supaError) {
      console.error('Ошибка загрузки статистики:', supaError)
      error.value = supaError
      loading.value = false
      return
    }

    // Группировка по tg_id
    const grouped = {}
    for (const p of data || []) {
      const tgId = p.tg_id
      if (!grouped[tgId]) {
        grouped[tgId] = {
          tg_id: tgId,
          name: p.username || p.name || `Player ${p.tg_id}`,
          goals: 0,
          assists: 0,
          games: 0,
        }
      }
      grouped[tgId].goals += Number(p.goals || 0)
      grouped[tgId].assists += Number(p.assists || 0)
      grouped[tgId].games += Number(p.game_counter || 0)
    }

    // Преобразуем в массив
    const merged = Object.values(grouped).map(p => {
      const points = p.goals + p.assists
      return {
        ...p,
        points,
        pointsPerGame: (points / (p.games || 1)).toFixed(2),
      }
    })

    // Сортировка по очкам
    merged.sort((a, b) => b.points - a.points)

    // Добавляем место
    players.value = merged.map((p, i) => ({ ...p, rank: i + 1 }))
    loading.value = false
  }

  // Вычисляем лучших игроков
  const topGoals = computed(() =>
    players.value.reduce((a, b) => (b.goals > a.goals ? b : a), players.value[0])
  )
  const topPoints = computed(() =>
    players.value.reduce((a, b) => (b.points > a.points ? b : a), players.value[0])
  )
  const topGames = computed(() =>
    players.value.reduce((a, b) => (b.games > a.games ? b : a), players.value[0])
  )

  return { players, loading, error, fetchStats, topGoals, topPoints, topGames }
})
