<template>
  <div class="max-w-3xl mx-auto">
    <ul v-if="players.length" class="flex flex-col gap-4 ">
      <li v-for="player in players" :key="player.id" class="grid grid-cols-[20px_160px_1fr_1fr_1fr_1fr_1fr] p-2 items-center border rounded-xl text-center">
        <span>{{ player.rank }}</span>
        <span class="text-start px-1">{{ player.name }}</span>
        <span>{{ player.goals }}</span>
        <span>{{ player.assists }}</span>
        <span>{{ player.points }}</span>
        <span>{{ player.games }}</span>
        <span>{{ player.pointsPerGame }}</span>
      </li>
    </ul>

    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const players = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('stats')
    .select('id, tg_id, name, username, goals, assists, game_counter, created_at')
    .order('goals', { ascending: false })

  if (error) {
    console.error('Ошибка при загрузке статистики:', error)
    return
  }

  players.value = (data || []).map((p, i) => {
    const goals = Number(p.goals || 0)
    const assists = Number(p.assists || 0)
    const games = Number(p.game_counter || 1)
    const points = goals + assists
    return {
      id: p.id,
      rank: i + 1,
      name: p.username || p.name || `Player ${p.tg_id}`,
      goals,
      assists,
      games,
      points,
      pointsPerGame: (points / (games || 1)).toFixed(2),
    }
  })
})
</script>

<style scoped>

</style>
