<template>
  <div class="w-full rounded-2xl overflow-hidden border border-gray-300">
    <!-- Header -->
    <div
      class="p-1 text-center text-sm font-bold tracking-wide bg-linear-to-r from-[#e9e9e9] from-0% via-[#e7e7e7] via-40% to-[#cdcdcd] to-90%"
    >
      <span class="uppercase truncate block px-1">{{ player.name }}</span>
    </div>

    <!-- Player image -->
    <div class="flex justify-center w-full">
      <Image
        :src="player.avatar_url || defaultAvatar"
        :alt="player.name"
        class="h-35 w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- Bottom -->
    <div class="bg-white px-4 py-2 relative flex flex-col gap-1">
      <!-- Top info -->
      <div class="flex items-center justify-between">
        <!-- Position -->
        <div class="text-center text-xs">
          <div>{{ playerPosition }}</div>
        </div>

        <!-- Overall -->
        <div class="text-center">
          <div class="text-4xl font-extrabold">{{ ratings.OVR }}</div>
          <div class="h-px bg-gray-200"></div>
          <div class="text-xs">OVR</div>
        </div>

        <div class="text-xs">{{ playerTeam }}</div>

        <!-- Team logo -->
        <div
          class="absolute -top-5 right-0 w-14 h-10 p-2 bg-white rounded-l-2xl flex items-center justify-center font-bold"
        >
          <img :src="teamLogo" alt="" loading="lazy" />
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
import { computed, ref, onMounted } from 'vue'
import { useStatsStore } from '@/stores/stats'
import { calculateRatings } from '@/rating/ratingEngine'
import { Image } from '@unpic/vue'

// ⬇️ 1. props
const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
})

// Состояния для данных профиля
const playerProfile = ref(null)
const loadingProfile = ref(false)

// Получаем данные профиля
onMounted(async () => {
  if (props.player.tg_id) {
    loadingProfile.value = true
    try {
      // Здесь нужно импортировать функцию получения профиля
      const { getPlayerProfile } = await import('@/utils/useProfile')
      playerProfile.value = await getPlayerProfile(props.player.tg_id)
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error)
    } finally {
      loadingProfile.value = false
    }
  }
})

// Вычисляемые свойства
const playerPosition = computed(() => {
  return playerProfile.value?.position || ''
})

const playerTeam = computed(() => {
  return playerProfile.value?.favorite_team_short || ''
})

const teamLogo = computed(() => {
  const abbr = playerProfile.value?.favorite_team_short
  if (!abbr || abbr === 'N/A') return null

  return `/logos/${abbr}.svg`
})

// Статистика
const statsStore = useStatsStore()
const allPlayers = computed(() => statsStore.players)
const ratings = computed(() => calculateRatings(props.player, allPlayers.value))

const stats = computed(() => [
  { label: 'SKT', value: ratings.value.SKT },
  { label: 'PAS', value: ratings.value.SHT },
  { label: 'OZE', value: ratings.value.HND },
  { label: 'POI', value: ratings.value.CHK },
])
</script>
