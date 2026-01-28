<template>
  <div class="max-w-xl mx-auto p-8 space-y-8">
    <!-- Заголовок -->
    <header class="space-y-2">
      <h1 class="text-2xl font-bold text-gray-900">Система расчета рейтингов игроков</h1>
      <p class="text-gray-600 text-sm">
        Объективная оценка игроков на основе статистики и сравнительного анализа
      </p>
    </header>

    <!-- Ключевые принципы -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">Ключевые принципы</h2>
      <div v-for="(p, index) in principles" :key="index" class="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 class="font-medium text-gray-900 mb-2">{{ p.title }}</h3>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li v-for="(point, i) in p.points" :key="i">{{ point }}</li>
        </ul>
      </div>
    </section>

    <!-- Метрики -->
    <section class="space-y-4">
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
    </section>

    <!-- Процесс расчета -->
    <section class="space-y-4">
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
    </section>

    <!-- Шкала рейтингов -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">Интерпретация рейтингов</h2>
      <div
        class="p-4 rounded-lg bg-linear-to-r from-orange-100 via-gray-100 to-yellow-100 border border-gray-200 space-y-2"
      >
        <div class="flex justify-between text-xs font-medium text-gray-700">
          <span>50 - Ниже среднего</span>
          <span>75 - Выше среднего</span>
          <span>90 - Топ</span>
          <span>99 - Лучший</span>
        </div>
        <div
          class="h-2 w-full rounded-full bg-linear-to-r from-orange-400 via-gray-300 to-yellow-300"
        ></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
          <div class="bg-white p-2 rounded-lg border border-gray-200">
            <p>Новичок (5 игр)</p>
            <p class="font-medium">Рейтинг 85</p>
            <p class="text-gray-500">Потенциал высокий, нужны подтверждения</p>
          </div>
          <div class="bg-white p-2 rounded-lg border border-gray-200">
            <p>Опытный (20+ игр)</p>
            <p class="font-medium">Рейтинг 78</p>
            <p class="text-gray-500">Стабильно выше среднего</p>
          </div>
          <div class="bg-white p-2 rounded-lg border border-gray-200">
            <p>Ветеран (50+ игр)</p>
            <p class="font-medium">Рейтинг 92</p>
            <p class="text-gray-500">Элитный уровень, подтвержденный статистикой</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Особенности системы -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">Особенности системы</h2>
      <div v-for="(f, i) in features" :key="i" class="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 class="font-medium text-gray-900 mb-1">{{ f.title }}</h3>
        <p class="text-gray-600 text-sm">{{ f.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RatingsHelpPageMinimal',
  data() {
    return {
      principles: [
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
      ],
      metrics: [
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
      ],
      calculationSteps: [
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
      ],
      features: [
        {
          title: 'Баланс точности',
          description: 'Новые игроки не наказываются резко, опытные получают точные оценки',
        },
        {
          title: 'Относительная шкала',
          description:
            'Рейтинги показывают позицию относительно всех игроков, а не абсолютное значение',
        },
        {
          title: 'Защита от аномалий',
          description:
            'Обработка нулевых значений и корректное определение процентилей минимизируют влияние случайностей',
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
