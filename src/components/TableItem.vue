<script setup>
import { ref, onMounted } from 'vue'
import { useStatsStore } from '../stores/stats'

const store = useStatsStore()
const openPlayer = ref(null)

onMounted(() => {
  if (!store.players.length) store.fetchStats()
})

const togglePlayer = async (tgId) => {
  if (openPlayer.value === tgId) {
    openPlayer.value = null
    return
  }
  openPlayer.value = tgId
  await store.fetchPlayerSessions(tgId)
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <ul v-if="store.players.length" class="flex flex-col gap-4">
      <li
        v-for="player in store.players"
        :key="player.tg_id"
        class="border rounded-xl overflow-hidden"
      >
        <!-- Основная строка -->
        <div
          class="grid grid-cols-[20px_160px_1fr_1fr_1fr_1fr_1fr] p-2 items-center text-center cursor-pointer hover:bg-gray-50"
          @click="togglePlayer(player.tg_id)"
        >
          <span>{{ player.rank }}</span>
          <span class="text-start px-1">{{ player.name }}</span>
          <span>{{ player.goals }}</span>
          <span>{{ player.assists }}</span>
          <span>{{ player.points }}</span>
          <span>{{ player.games }}</span>
          <span>{{ player.pointsPerGame }}</span>
        </div>

        <!-- Подробности -->
        <transition name="fade">
          <div v-if="openPlayer === player.tg_id" class="bg-gray-50 px-4 py-2 text-sm border-t">
            <h4 class="font-semibold mb-2">Последние 5 игр:</h4>

            <ul v-if="store.playerSessions[player.tg_id]">
              <li
                v-for="(session, index) in store.playerSessions[player.tg_id]"
                :key="index"
                class="flex justify-between py-1 border-b last:border-none"
              >
                <span>{{ new Date(session.game_day).toLocaleDateString('ru-RU') }}</span>
                <span>🏒 {{ session.goals }} | 🎯 {{ session.assists }}</span>
              </li>
            </ul>

            <p v-else>Загрузка...</p>
          </div>
        </transition>
      </li>
    </ul>

    <p v-else>Загрузка...</p>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
