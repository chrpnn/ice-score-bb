<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-(--vt-c-text-dark-1)">Ключевые принципы</h2>
    <div
      v-for="(p, index) in principles"
      :key="index"
      class="p-4 border border-(--vt-c-divider-light-2) rounded-2xl bg-(--color-background)"
    >
      <h3 class="font-medium text-(--vt-c-text-dark-1) mb-2">{{ p.title }}</h3>
      <ul class="list-disc list-inside text-(--vt-c-text-light-2) space-y-1">
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
