<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-gray-800">Ключевые принципы</h2>
    <div
      v-for="(p, index) in principles"
      :key="index"
      class="p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      <h3 class="font-medium text-gray-900 mb-2">{{ p.title }}</h3>
      <ul class="list-disc list-inside text-gray-600 space-y-1">
        <li v-for="(point, i) in p.points" :key="i">{{ point }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const principles = [
  {
    title: 'Сравнительный анализ',
    points: [
      'Оценка относительно всех игроков',
      'Определение позиции в распределении (процентиль)',
      'Чем выше позиция, тем выше рейтинг',
    ],
  },
  {
    title: 'Учет надежности',
    points: [
      'Коэффициент уверенности от 0 до 1',
      'Чем больше матчей, тем выше точность',
      '8+ матчей для максимальной уверенности',
    ],
  },
]
</script>

<style scoped></style>
