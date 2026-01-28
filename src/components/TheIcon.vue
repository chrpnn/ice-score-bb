<template>
  <IconifyIcon :icon="icon" :width="size" :height="size" />
</template>

<script setup>
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: '1.5em',
  },
})
</script>