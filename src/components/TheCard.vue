<template>
  <div class="w-full  rounded-2xl overflow-hidden border border-gray-300">
    <!-- Header -->
    <div
      class="p-1 text-center text-sm font-bold tracking-wide bg-linear-to-r from-[#e9e9e9] from-0% via-[#e7e7e7] via-40% to-[#cdcdcd] to-90%"
    >
      <span class="uppercase truncate block px-1">{{ player.name }}</span>
    </div>

    <!-- Player image -->
    <div class="flex justify-center w-full">
      <img
        :src="player.avatar_url || defaultAvatar"
        :alt="player.name"
        class="h-35 w-full object-cover"
      />
    </div>

    <!-- Bottom -->
    <div class="bg-white px-4 py-2 relative flex flex-col gap-1">
      <!-- Top info -->
      <div class="flex items-center justify-between">
        <!-- Position -->
        <div class="text-center text-xs">
          <div>TWF</div>
        </div>

        <!-- Overall -->
        <div class="text-center">
          <div class="text-4xl font-extrabold">{{ ratings.OVR }}</div>
          <div class="h-px bg-gray-200"></div>
          <div class="text-xs">OVR</div>
        </div>

        <div class="text-xs">DET</div>

        <!-- Team logo mock -->
        <div
          class="absolute -top-5 right-4 w-10 h-10 p-1 bg-white border border-gray-200 outline-4 outline-white rounded-full flex items-center justify-center font-bold"
        >
          <img src="../assets/images/Detroit.svg" alt="" />
        </div>
      </div>

      <!-- Stats -->
      <div class="flex gap-2 justify-between text-center text-xs">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-sm font-bold">{{ stat.value }}</div>
          <div class="h-px bg-gray-200"></div>
          <div class="text-gray-500">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStatsStore } from '@/stores/stats'
import { calculateRatings } from '@/rating/ratingEngine'

// ⬇️ 1. props
const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
})

// Отладка
console.log('Player data:', {
  name: props.player.name,
  avatar_url: props.player.avatar_url,
  id: props.player.tg_id,
  allProps: props.player,
})

// ⬇️ 2. стор
const statsStore = useStatsStore()

// ⬇️ 3. все игроки (пул)
const allPlayers = computed(() => statsStore.players)

// ⬇️ 4. рейтинги (ОБЯЗАТЕЛЬНО computed)
const ratings = computed(() => calculateRatings(props.player, allPlayers.value))

// ⬇️ 5. статы для UI
const stats = computed(() => [
  { label: 'SKT', value: ratings.value.SKT },
  { label: 'SHT', value: ratings.value.SHT },
  { label: 'HND', value: ratings.value.HND },
  { label: 'CHK', value: ratings.value.CHK },
])
</script>
