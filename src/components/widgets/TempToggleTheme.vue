<template>
  <div
    class=" flex flex-col items-center justify-center gap-6  "
    :style="{ backgroundColor: 'var(--color-background)' }"
  >
    <button
      @click="toggleTheme"
      class="px-4 py-2 rounded-lg border w-full"
      :style="{
        color: 'var(--color-text)',
        borderColor: 'var(--color-border)',
      }"
    >
      Переключить тему ({{ theme }})
    </button>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>
