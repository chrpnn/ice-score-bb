<script setup>
import { onMounted } from 'vue'
import { useStatsStore } from '../stores/stats'

const store = useStatsStore()

onMounted(() => {
  if (!store.players.length) store.fetchStats()
})
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <ul v-if="store.players.length" class="flex flex-col gap-4">
      <li
        v-for="player in store.players"
        :key="player.tg_id"
        class="grid grid-cols-[20px_160px_1fr_1fr_1fr_1fr_1fr] p-2 items-center border rounded-xl text-center"
      >
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
