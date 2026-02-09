<template>
  <ul v-if="store.players.length" class="flex flex-col gap-3 text-neutral-600">
    <li
      v-for="(player, index) in players"
      :key="player.tg_id"
      class="border border-neutral-400 rounded-xl overflow-hidden bg-neutral-100"
    >
      <!-- Основная строка -->
      <div
        class="stats-grid px-2 py-2 text-center cursor-pointer"
        @click="togglePlayer(player.tg_id)"
      >
        <span>{{ index + 1 }}</span>
        <span class="text-start truncate">{{ player.name }}</span>
        <span>{{ player.goals }}</span>
        <span>{{ player.assists }}</span>
        <span>{{ player.points }}</span>
        <span>{{ player.games }}</span>
        <span>{{ player.pointsPerGame }}</span>
      </div>

      <!-- Детали -->

      <div
        v-if="openPlayer === player.tg_id"
        class="bg-neutral-50 px-4 py-2 text-sm border-t border-neutral-400"
      >
        <h4 class="font-semibold mb-2">{{ player.name }}: последние 5 игр</h4>

        <ul v-if="store.playerSessions[player.tg_id]">
          <li
            v-for="(session, i) in store.playerSessions[player.tg_id]"
            :key="i"
            class="flex justify-between py-1 border-b border-neutral-300 last:border-none"
          >
            <span>
              {{ new Date(session.game_day).toLocaleDateString('ru-RU') }}
            </span>
            <span>G {{ session.goals }} - A {{ session.assists }}</span>
          </li>
        </ul>

        <p v-else>Загрузка…</p>
      </div>
    </li>
  </ul>

  <p v-else>Загрузка…</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStatsStore } from '../stores/stats'

const store = useStatsStore()
const openPlayer = ref(null)

defineProps({
  players: {
    type: Array,
    required: true,
  },
})

onMounted(() => {
  if (!store.players.length) store.fetchStats()
})

const togglePlayer = async (tgId) => {
  openPlayer.value = openPlayer.value === tgId ? null : tgId
  if (openPlayer.value) {
    await store.fetchPlayerSessions(tgId)
  }
}
</script>

<style scoped></style>
