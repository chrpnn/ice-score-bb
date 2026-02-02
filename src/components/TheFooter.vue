<template>
  <nav
    class="sticky bottom-0 flex justify-around p-4 border-t border-neutral-300 rounded-t-2xl bg-neutral-50"
  >
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
  { label: 'Главная', icon: 'mdi-light:trophy', to: '/' },
  { label: 'Игроки', icon: 'mdi-light:clipboard', to: '/players' },
  { label: 'Add', icon: 'mdi-light:plus-box', to: '/add' },
  { label: 'Инфо', icon: 'mdi-light:information', to: '/about' },
  { label: 'Профиль', icon: 'mdi-light:account', to: '/profile' },
]
</script>
