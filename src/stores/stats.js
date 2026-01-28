import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useStatsStore = defineStore('stats', () => {
  // состояния
  const players = ref([]) // все игроки с суммой показателей
  const playerSessions = ref({}) // последние 5 игр каждого игрока
  const loading = ref(false)
  const error = ref(null)

  // получение общей статы по всем игрокам
  const fetchStats = async () => {
    loading.value = true
    error.value = null

    // получаем все записи из таблицы
    const { data, error: supaError } = await supabase
      .from('stats')
      .select('tg_id, name, username, goals, assists, game_counter, avatar_url')

    if (supaError) {
      error.value = supaError
      loading.value = false
      return
    }

    // группировка по tg_id
    const grouped = {}
  for (const p of data || []) {
    const id = p.tg_id
    if (!grouped[id]) {
      grouped[id] = {
        tg_id: id,
        name: p.username || p.name || `Player ${id}`,
        goals: 0,
        assists: 0,
        games: 0,
        avatar_url: p.avatar_url || null, // сохраняем первую найденную аву
      }
    }

    grouped[id].goals += Number(p.goals || 0)
    grouped[id].assists += Number(p.assists || 0)
    grouped[id].games += Number(p.game_counter || 0)

    // если ещё нет аватарки, берём текущую
    if (!grouped[id].avatar_url && p.avatar_url) {
      grouped[id].avatar_url = p.avatar_url
    }
  }

  

    console.log(grouped)

    // подсчёт очков и среднего за игру
    const merged = Object.values(grouped).map((p) => {
      const points = p.goals + p.assists
      return {
        ...p,
        points,
        pointsPerGame: (points / (p.games || 1)).toFixed(2),
        avatar_url: p.avatar_url || null,
      }
    })

    // сортировка и присвоение мест
    players.value = merged
      .sort((a, b) => b.points - a.points)
      .map((p, i) => ({ ...p, rank: i + 1 }))

    loading.value = false
  }

  // загрузка последних 5 записей игрока
  const fetchPlayerSessions = async (tgId) => {
    if (!tgId || playerSessions.value[tgId]) return // не грузим повторно

    const { data, error: supaError } = await supabase
      .from('stats')
      .select('goals, assists, game_day')
      .eq('tg_id', tgId)
      .order('game_day', { ascending: false })
      .limit(5)

    if (supaError) {
      console.error(`Ошибка загрузки сессий (${tgId}):`, supaError)
      return
    }

    playerSessions.value[tgId] = data
  }

  // лидеры по разным метрикам
  const topGoals = computed(() =>
    players.value.reduce((a, b) => (b.goals > a.goals ? b : a), players.value[0]),
  )

  const topPoints = computed(() =>
    players.value.reduce((a, b) => (b.points > a.points ? b : a), players.value[0]),
  )

  const topGames = computed(() =>
    players.value.reduce((a, b) => (b.games > a.games ? b : a), players.value[0]),
  )

  // экспорт стора
  return {
    players,
    playerSessions,
    loading,
    error,
    fetchStats,
    fetchPlayerSessions,
    topGoals,
    topPoints,
    topGames,
  }
})
