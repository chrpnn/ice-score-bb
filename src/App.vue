<template>
  <RouterView />
  <TheFooter />
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheFooter from './components/TheFooter.vue'

import { ref, onMounted } from 'vue'
import { getTelegramUser } from '@/utils/useTelegramUser'
import { ensurePlayer } from '@/utils/usePlayer'

const user = ref(null)
const player = ref(null)

onMounted(async () => {
  user.value = getTelegramUser()

  if (!user.value) return

  try {
    player.value = await ensurePlayer()
    console.log('Player ensured:', player.value)
  } catch (e) {
    console.error('Failed to ensure player', e)
  }
})

</script>

<style scoped></style>
