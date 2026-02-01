<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-gray-800">Показатели</h2>
    <div
      v-for="metric in metrics"
      :key="metric.id"
      class="p-4 border border-gray-200 rounded-lg bg-white flex flex-col"
    >
      <div class="flex justify-between items-center mb-1">
        <span class="font-medium text-gray-900">{{ metric.name }} ({{ metric.abbr }})</span>
        <span class="text-sm px-2 py-0.5 rounded-full" :class="metric.badgeColor"
          >{{ metric.weight }}%</span
        >
      </div>
      <p class="text-gray-600 text-sm mb-1">
        Формула: <span class="font-mono">{{ metric.formula }}</span>
      </p>
      <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div class="h-2 rounded-full bg-blue-500" :style="{ width: metric.weight + '%' }"></div>
      </div>
      <p class="text-gray-500 text-xs mt-1">{{ metric.description }}</p>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  {
    id: 1,
    abbr: 'SHT',
    name: 'Бросок',
    formula: 'Голы ÷ Игры',
    weight: 30,
    description: 'Оценивает результативность и точность бросков',
    badgeColor: 'bg-red-100 text-red-800',
  },
  {
    id: 2,
    abbr: 'HND',
    name: 'Передача',
    formula: 'Голевые передачи ÷ Игры',
    weight: 25,
    description: 'Оценивает качество и эффективность пасов',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 3,
    abbr: 'SKT',
    name: 'Комбинация',
    formula: '(Голы + ГП) ÷ Игры',
    weight: 25,
    description: 'Общая эффективность в атакующих действиях',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    id: 4,
    abbr: 'CHK',
    name: 'Вклад',
    formula: 'Голы × 1.5 + ГП',
    weight: 20,
    description: 'Абсолютный вклад в очки команды',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
]
</script>
