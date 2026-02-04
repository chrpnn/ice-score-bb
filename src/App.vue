<template>
  <RouterView />
  <TheFooter />
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheFooter from './components/TheFooter.vue'

import { ref, onMounted } from 'vue'
import { getTelegramUser } from '@/utils/useTelegramUser'

const user = ref(null)

onMounted(() => {
  user.value = getTelegramUser()
})
</script>

<style scoped></style>
