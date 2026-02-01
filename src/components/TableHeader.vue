<script setup>
import { ref } from 'vue'

const sortKey = ref(null)
const sortDir = ref('desc')

const emit = defineEmits(['sort'])

const columns = [
  { key: 'rank', label: '', sortable: false },
  { key: 'name', label: '', sortable: true },
  { key: 'goals', label: 'G', sortable: true },
  { key: 'assists', label: 'A', sortable: true },
  { key: 'points', label: 'P', sortable: true },
  { key: 'games', label: 'GP', sortable: true },
  { key: 'pointsPerGame', label: 'P/GP', sortable: true },
]

const onSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'desc'
  }

  emit('sort', { key: sortKey.value, dir: sortDir.value })
}
</script>

<template>
  <li class="stats-grid stats-header px-2 py-4 text-xs text-gray-500 bg-gray-200">
    <span
      v-for="col in columns"
      :key="col.key"
      class="relative flex flex-col items-center justify-center select-none"
      :class="{
        'cursor-pointer hover:text-black': col.sortable,
        'text-black font-semibold': sortKey === col.key,
      }"
      @click="col.sortable && onSort(col.key)"
    >
      <!-- Точка сверху (asc) -->
      <span
        class="absolute -top-2 text-[10px] leading-none transition-opacity"
        :class="sortKey === col.key && sortDir === 'asc' ? 'opacity-100' : 'opacity-0'"
      >
        •
      </span>

      <!-- Label -->
      <span>{{ col.label }}</span>

      <!-- Точка снизу (desc) -->
      <span
        class="absolute -bottom-2 text-[10px] leading-none transition-opacity"
        :class="sortKey === col.key && sortDir === 'desc' ? 'opacity-100' : 'opacity-0'"
      >
        •
      </span>
    </span>
  </li>
</template>
