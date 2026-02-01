<template>
  <div class="space-y-4">
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
  </div>
</template>

<script setup></script>

<style scoped></style>
