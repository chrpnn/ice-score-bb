<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-(--vt-c-text-dark-1)">Показатели</h2>
    <div
      v-for="metric in metrics"
      :key="metric.id"
      class="p-4 border border-(--vt-c-divider-light-2) rounded-2xl bg-(--color-background) flex flex-col gap-2"
    >
      <div class="flex justify-between items-center mb-1">
        <span class="font-medium text-(--vt-c-text-dark-1)"
          >{{ metric.name }} ({{ metric.abbr }})</span
        >
        <span
          class="text-sm px-2 py-0.5 rounded-full bg-(--vt-c-white-soft) border border-(--vt-c-divider-light-2)"
          >{{ metric.weight }}%</span
        >
      </div>
      <p class="text-(--vt-c-text-light-2) text-sm mb-1">
        Формула: <span>{{ metric.formula }}</span>
      </p>
      <div class="w-full bg-(--vt-c-white-soft) h-2 rounded-full overflow-hidden">
        <div
          class="h-2 rounded-full bg-(--vt-c-white-mute)"
          :style="{ width: metric.weight + '%' }"
        ></div>
      </div>
      <p class="text-(--vt-c-text-light-2) text-xs mt-1 font-light">{{ metric.description }}</p>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  {
    id: 1,
    abbr: 'SHT - Shooting',
    name: 'Точность броска',
    formula: 'Голы ÷ Игры',
    weight: 30,
    description: 'Оценивает результативность и точность бросков',
  },
  {
    id: 2,
    abbr: 'PAS - Passing',
    name: 'Точность паса',
    formula: 'Голевые передачи ÷ Игры',
    weight: 25,
    description: 'Оценивает качество и эффективность пасов',
  },
  {
    id: 3,
    abbr: 'OZE - Offensive Zone Efficiency',
    name: 'Эффективность в зоне атаки',
    formula: '(Голы + ГП) ÷ Игры',
    weight: 25,
    description: 'Общая эффективность в атакующих действиях',
  },
  {
    id: 4,
    abbr: 'POI - Poise',
    name: 'Самообладание',
    formula: 'Голы × 1.5 + ГП',
    weight: 20,
    description: 'Вклад в итоговый результат команды',
  },
]
</script>
