<template>
  <div class="max-w-md mx-auto p-8 space-y-8 h-screen-min">
    <!-- Форма -->
    <div
      class="bg-(--color-background) rounded-2xl border border-(--vt-c-divider-light-2) p-4 space-y-4"
    >
      <h2 class="text-2xl font-semibold text-center text-(--vt-c-black-soft)">
        Записать результат
      </h2>

      <div class="space-y-3 text-(--vt-c-black-soft)">
        <input
          v-model.number="goals"
          type="number"
          min="0"
          placeholder="Шайб заброшено:"
          class="w-full border border-(--vt-c-divider-light-2) rounded-2xl px-4 py-3 bg-(--color-background-soft)"
        />

        <input
          v-model.number="assists"
          type="number"
          min="0"
          placeholder="Голевых передач:"
          class="w-full border border-(--vt-c-divider-light-2) rounded-2xl px-4 py-3 bg-(--color-background-soft)"
        />

        <input
          v-model="gameDay"
          type="date"
          class="w-full border border-(--vt-c-divider-light-2) rounded-2xl px-4 py-3 bg-(--color-background-soft)"
        />
      </div>

      <button
        @click="addResult"
        class="w-full bg-(--color-background-mute) text-(--vt-c-white) py-3 rounded-2xl"
      >
        Сохранить результат
      </button>
    </div>

    <!-- История -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-center">История матчей</h3>

      <div v-if="results.length === 0" class="text-center text-(--vt-c-text-light-1) text-sm">
        Пока записей нет
      </div>

      <div
        v-for="item in results"
        :key="item.id"
        class="bg-(--color-background) text-(--vt-c-black-soft) border border-(--vt-c-divider-light-2) rounded-2xl p-4 space-y-2"
      >
        <div class="flex justify-between text-sm">
          <span>Голов забито</span>
          <b>{{ item.goals }}</b>
        </div>

        <div class="flex justify-between text-sm">
          <span>Голевых передач</span>
          <b>{{ item.assists }}</b>
        </div>

        <div class="flex justify-between text-sm text-(--vt-c-text-light-2)">
          <span>Дата игры / тренировки</span>
          <span>{{ item.game_day }}</span>
        </div>

        <button
          @click="removeResult(item.id)"
          class="w-full mt-2 text-red-400 border border-(--vt-c-divider-light-2) bg-(--color-background-soft) rounded-xl py-2 text-sm"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { addStat, deleteStat } from '../utils/useStats'
import { supabase } from '../lib/supabase'
import { getTelegramUser } from '@/utils/useTelegramUser'

const results = ref([])

const goals = ref(null)
const assists = ref(null)
const gameDay = ref('')

// заменит потом на веб тг
// const user = {
//   tg_id: 671558872,
//   name: 'Александр',
//   username: 'realmeiso',
//   avatar_url: null,
// }

const user = getTelegramUser()

const loadStats = async () => {
  const { data } = await supabase
    .from('stats')
    .select('*')
    .eq('tg_id', user.tg_id)
    .order('game_day', { ascending: false })

  results.value = data || []
}

const addResult = async () => {
  if (goals.value === null || assists.value === null || !gameDay.value) return

  const newStat = await addStat({
    tg_id: user.tg_id,
    name: user.name,
    username: user.username,
    avatar_url: user.avatar_url,
    goals: goals.value,
    assists: assists.value,
    game_day: gameDay.value,
  })

  results.value.unshift(newStat)

  goals.value = null
  assists.value = null
  gameDay.value = ''
}

const removeResult = async (id) => {
  await deleteStat(id)
  results.value = results.value.filter((r) => r.id !== id)
}

onMounted(loadStats)
</script>
