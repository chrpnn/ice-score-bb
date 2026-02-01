<template>
  <div class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">Процесс расчета</h2>
      <div
        v-for="(step, index) in calculationSteps"
        :key="index"
        class="p-4 border border-gray-200 rounded-lg bg-gray-50"
      >
        <div class="flex items-center mb-2">
          <div
            class="w-6 h-6 bg-blue-200 text-blue-700 flex items-center justify-center rounded-full mr-2 font-bold text-sm"
          >
            {{ index + 1 }}
          </div>
          <h3 class="font-medium text-gray-900">{{ step.title }}</h3>
        </div>
        <p class="text-gray-600 text-sm">{{ step.description }}</p>
        <p v-if="step.example" class="text-gray-500 text-xs mt-1">Пример: {{ step.example }}</p>
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
      example: 'SHT×30% + HND×25% + ...',
    },
  ]
</script>

<style scoped></style>
