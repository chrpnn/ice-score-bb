<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-gray-800">Особенности системы</h2>
    <div
      v-for="(f, i) in features"
      :key="i"
      class="p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      <h3 class="font-medium text-gray-900 mb-1">{{ f.title }}</h3>
      <p class="text-gray-600 text-sm">{{ f.description }}</p>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Баланс точности',
    description: 'Новые игроки не наказываются резко, опытные получают точные оценки',
  },
  {
    title: 'Относительная шкала',
    description: 'Рейтинги показывают позицию относительно всех игроков, а не абсолютное значение',
  },
  {
    title: 'Защита от аномалий',
    description:
      'Обработка нулевых значений и корректное определение процентилей минимизируют влияние случайностей',
  },
]
</script>

<style scoped></style>
