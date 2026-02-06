<template>
  <div class="items-center p-8 min-h-[calc(100vh-5.5rem)]">
    <div
      class="flex flex-col p-4 gap-4 bg-(--color-background) border border-(--vt-c-divider-light-2) rounded-2xl"
    >
      <p class="text-center text-gray-700 font-medium">
        {{ tgUser?.name || 'Игрок' }}
      </p>
      <p v-if="tgUser?.username" class="text-center text-sm text-gray-400">
        @{{ tgUser.username }}
      </p>

      <!-- Аватар -->
      <div class="flex flex-col items-center gap-3">
        <div
          class="w-38 h-38 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
        >
          <img v-if="avatarPreview" :src="tgUser.avatar_url" class="w-full h-full object-cover" />
          <span v-else class="text-gray-400 text-sm"> Нет фото </span>
        </div>
      </div>

      <!-- Позиция -->
      <div class="flex flex-col gap-2">
        <label class="px-2 text-sm text-gray-600"> Предпочитаемая позиция на поле: </label>
        <select
          v-model="position"
          class="w-full border border-(--vt-c-divider-light-2) rounded-2xl px-4 py-3 bg-(--color-background-soft)"
        >
          <option value="" disabled>Выберите позицию</option>
          <option v-for="pos in positions" :key="pos" :value="pos">
            {{ pos }}
          </option>
        </select>
      </div>

      <!-- Команда -->
      <div class="flex flex-col gap-2">
        <label class="px-2 text-sm text-gray-600"> Любимая команда: </label>
        <select
          v-model="favoriteTeam"
          class="w-full border border-(--vt-c-divider-light-2) rounded-2xl px-4 py-3 bg-(--color-background-soft)"
        >
          <option value="" disabled>Выберите команду</option>
          <option v-for="team in teams" :key="team" :value="team">
            {{ team }}
          </option>
        </select>
      </div>

      <!-- Кнопка сохранения -->
      <button
        @click="saveProfile"
        class="w-full bg-(--color-background-mute) text-(--vt-c-white) py-3 rounded-2xl"
      >
        Сохранить профиль
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTelegramUser } from '@/utils/useTelegramUser'
import { getPlayerProfile, updatePlayerProfile } from '@/utils/useProfile'

const tgUser = ref(null)

const avatarPreview = ref(null)

const position = ref('')
const favoriteTeam = ref('')

const positions = ['Вратарь', 'Защитник', 'Нападающий', 'Универсал']
const teams = ['СКА', 'ЦСКА', 'Ак Барс', 'Авангард', 'Металлург', 'Динамо']

onMounted(async () => {
  tgUser.value = getTelegramUser()

  if (!tgUser.value?.id) return

  if (tgUser.value.avatar_url) {
    avatarPreview.value = tgUser.value.avatar_url
  }

  try {
    const profile = await getPlayerProfile(tgUser.value.id)

    // 👉 значения по умолчанию из БД
    position.value = profile.position || ''
    favoriteTeam.value = profile.favorite_team || ''
  } catch {
    console.warn('Профиль не найден или ошибка загрузки')
  }
})

// сохранение профиля
const saveProfile = async () => {

  console.log('КНОПКА НАЖАТА')
  if (!tgUser.value?.id) return

  try {
    await updatePlayerProfile(tgUser.value.id, {
      position: position.value,
      favoriteTeam: favoriteTeam.value,
    })

    console.log('Профиль сохранён')
  } catch (error) {
    console.error('Ошибка сохранения профиля:', error)
  }
}
</script>
