<script setup>
import { onMounted } from 'vue'
import { useStatsStore } from '../stores/stats'

const store = useStatsStore()

onMounted(() => {
  if (!store.players.length) store.fetchStats()
})
</script>

<template>
  <div class="flex gap-6 px-8 pt-12 pb-16 justify-center items-center text-center">
    <div v-if="store.topGoals" class="rounded-xl w-30 flex flex-col justify-center">
      <p class="text-sm">goals</p>
      <p class="text-8xl" style="font-weight: 700">{{ store.topGoals.goals }}</p>
      <p class="text-sm">{{ store.topGoals.name }}</p>
    </div>

    <div v-if="store.topPoints" class="rounded-xl w-30 flex flex-col justify-center">
      <p class="text-sm">points</p>
      <p class="text-8xl" style="font-weight: 700">{{ store.topPoints.points }}</p>
      <p class="text-sm">{{ store.topPoints.name }}</p>
    </div>

    <div v-if="store.topGames" class="rounded-xl w-30 flex flex-col justify-center">
      <p class="text-sm">games</p>
      <p class="text-8xl" style="font-weight: 700">{{ store.topGames.games }}</p>
      <p class="text-sm">{{ store.topGames.name }}</p>
    </div>
  </div>
</template>