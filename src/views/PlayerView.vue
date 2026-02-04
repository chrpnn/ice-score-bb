<template>
  <div class="bg-gray-200 h-[calc(100vh-5.5rem)] p-8">
    <div class="flex flex-col gap-2 mb-8">
      <h1 class="text-2xl font-semibold">Рейтинг</h1>
      <p>Всего игроков: {{ statsStore.players.length }}</p>
    </div>

    <div class="flex flex-wrap gap-6 justify-between">
      <TheCard v-for="player in statsStore.players" :key="player.tg_id" :player="player" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStatsStore } from '@/stores/stats'
import TheCard from '@/components/TheCard.vue'

const statsStore = useStatsStore()

onMounted(() => {
  statsStore.fetchStats()
})
</script>
