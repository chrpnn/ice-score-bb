<template>
  <nav class="sticky bottom-0 flex justify-around p-4 rounded-t-2xl bg-white">
    <RouterLink
      v-for="item in menu"
      :key="item.label"
      :to="item.to"
      class="flex flex-col items-center gap-1"
    >
      <Icon :icon="item.icon" size="30px" />

      <span class="text-sm">
        {{ item.label }}
      </span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Icon from '@/components/TheIcon.vue'

const menu = [
  { label: 'Главная', icon: 'ph:hockey', to: '/' },
  { label: 'Игроки', icon: 'mdi:contact', to: '/players' },
  { label: 'Инфо', icon: 'ix:about-filled', to: '/about' },
]
</script>
