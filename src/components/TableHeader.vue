<template>
  <div></div>
  <li class="grid px-2 grid-cols-[20px_160px_1fr_1fr_1fr_1fr_1fr]">
    <span
      v-for="col in columns"
      :key="col.key"
      class="text-center"
    >
      {{ col.label }}
    </span>
  </li>
</template>

<script setup>

const columns = [
  { key: 'rank', label: '' },
  { key: 'name', label: '' },
  { key: 'goals', label: 'G' },
  { key: 'assists', label: 'A' },
  { key: 'points', label: 'P' },
  { key: 'games', label: 'GP' },
  { key: 'pointsPerGame', label: 'P/GP' },
]

</script>


