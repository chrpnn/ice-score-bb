<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-(--vt-c-text-dark-1)">Процесс расчета</h2>
    <div
      v-for="(step, index) in calculationSteps"
      :key="index"
      class="p-4 border border-(--vt-c-divider-light-2) rounded-2xl bg-(--color-background) flex flex-col gap-2"
    >
      <div class="flex items-center mb-2">
        <h3 class="font-medium text-(--vt-c-text-dark-1)">{{ step.title }}</h3>
      </div>
      <p class="text-(--vt-c-text-light-2) text-sm mb-1">{{ step.description }}</p>
      <p v-if="step.example" class="text-(--vt-c-text-light-2) text-sm mb-1">
        Пример: {{ step.example }}
      </p>
    </div>
  </div>
</template>

<script setup>
const calculationSteps = [
  {
    title: 'Подготовка данных',
    description: 'Создаются массивы значений всех игроков и сортируются по возрастанию',
    example: 'SHT: [0.1,0.3,0.5,0.7,0.9]',
  },
  {
    title: 'Определение позиции',
    description: 'Подсчитывается процент игроков с показателем ниже текущего',
    example: 'Процентиль = 0.8',
  },
  {
    title: 'Нормализация рейтинга',
    description: 'Процентиль переводится в шкалу от 50 до 99',
    example: '0.8 → 90',
  },
  {
    title: 'Учет опыта',
    description: 'Рейтинг корректируется с учетом сыгранных матчей',
    example: '5 игр → рейтинг ближе к 50',
  },
  {
    title: 'Общий рейтинг',
    description: 'OVR = средневзвешенное всех показателей',
    example: 'SHT×30% + PAS×25% + ...',
  },
]
</script>

<style scoped></style>
