<script setup>
import TableHeader from './TableHeader.vue'
import TableItem from './TableItem.vue'

import { ref, computed } from 'vue'
import { useStatsStore } from '../stores/stats'

const store = useStatsStore()

const sort = ref({
  key: null,
  dir: 'desc',
})

const sortedPlayers = computed(() => {
  if (!sort.value.key) return store.players

  return [...store.players].sort((a, b) => {
    const valA = a[sort.value.key]
    const valB = b[sort.value.key]

    if (typeof valA === 'string') {
      return sort.value.dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
    }

    return sort.value.dir === 'asc' ? valA - valB : valB - valA
  })
})
</script>

<template>
  <div class="max-w-3xl mx-auto rounded-t-2xl py-8 px-8 bg-gray-200 h-screen text-gray-800">
    <TableHeader @sort="sort = $event" />
    <TableItem :players="sortedPlayers" />
  </div>
</template>
