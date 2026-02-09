<template>
  <div class="bg-gray-200 min-h-[calc(100vh-5.5rem)] px-8">
    <div class="sticky py-4 top-0 bg-gray-200 z-10">
      <h1 class="text-2xl font-semibold">Рейтинг</h1>
      <p>Всего игроков: {{ statsStore.players.length }}</p>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
    >
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
