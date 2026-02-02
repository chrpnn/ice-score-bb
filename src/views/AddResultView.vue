<template>
  <div class="max-w-md mx-auto p-4 space-y-6 h-screen">
    <!-- Форма -->
    <div class="bg-white rounded-2xl shadow p-4 space-y-4">
      <h2 class="text-xl font-semibold text-center">Добавить матч</h2>

      <div class="space-y-3">
        <input
          v-model.number="goals"
          type="number"
          min="0"
          inputmode="numeric"
          placeholder="🏒 Шайбы"
          class="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model.number="assists"
          type="number"
          min="0"
          inputmode="numeric"
          placeholder="🎯 Пасы"
          class="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model="date"
          type="date"
          class="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        @click="addResult"
        class="w-full bg-blue-600 text-white py-3 rounded-xl text-base font-medium active:scale-[0.98] transition"
      >
        Сохранить результат
      </button>
    </div>

    <!-- История -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-center">История матчей</h3>

      <div v-if="results.length === 0" class="text-center text-gray-500 text-sm">
        Пока записей нет
      </div>

      <div
        v-for="result in results"
        :key="result.id"
        class="bg-gray-50 border rounded-2xl p-4 space-y-2"
      >
        <div class="flex justify-between text-sm">
          <span>🏒 Шайбы</span>
          <b>{{ result.goals }}</b>
        </div>

        <div class="flex justify-between text-sm">
          <span>🎯 Пасы</span>
          <b>{{ result.assists }}</b>
        </div>

        <div class="flex justify-between text-sm text-gray-600">
          <span>📅 Дата</span>
          <span>{{ result.date }}</span>
        </div>

        <button
          @click="removeResult(result.id)"
          class="w-full mt-2 text-red-500 border border-red-200 rounded-xl py-2 text-sm active:scale-[0.98]"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const goals = ref('')
const assists = ref('')
const date = ref('')
const results = ref([])

const addResult = () => {
  if (goals.value === '' || assists.value === '' || !date.value) return

  results.value.unshift({
    id: Date.now(),
    goals: goals.value,
    assists: assists.value,
    date: date.value,
  })

  goals.value = ''
  assists.value = ''
  date.value = ''
}

const removeResult = (id) => {
  results.value = results.value.filter((r) => r.id !== id)
}
</script>
