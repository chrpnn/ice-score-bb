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
          <img
            v-if="tgUser?.avatar_url"
            :src="tgUser.avatar_url"
            class="w-full h-full object-cover"
            alt="Аватар пользователя"
          />
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
          <option v-for="team in nhlTeams" :key="team.id" :value="team.name">
            {{ team.name }}
          </option>
        </select>
      </div>

      <!-- Кнопка сохранения -->
      <button
        @click="saveProfile"
        class="w-full bg-(--color-background-mute) text-(--vt-c-white) py-3 rounded-2xl hover:bg-(--color-background-soft) transition-colors"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Сохранение...' : 'Сохранить профиль' }}
      </button>

      <!-- Сообщение об успешном сохранении -->
      <div v-if="successMessage" class="text-green-600 text-center text-sm mt-2">
        {{ successMessage }}
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage" class="text-red-600 text-center text-sm mt-2">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTelegramUser } from '@/utils/useTelegramUser'
import { getPlayerProfile, updatePlayerProfile } from '@/utils/useProfile'
import { nhlTeams } from '@/data/nhlTeams'

const tgUser = ref(null)
const position = ref('')
const favoriteTeam = ref('')
const isSaving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const positions = ['G', 'D', 'LW', 'RW', 'C']


onMounted(async () => {
  tgUser.value = getTelegramUser()
  console.log('tgUser', tgUser.value)

  if (!tgUser.value?.tg_id) {
    console.error('Не найден tg_id у пользователя')
    return
  }

  try {
    const profile = await getPlayerProfile(tgUser.value.tg_id)
    console.log('Загруженный профиль:', profile)

    // Устанавливаем значения из базы данных
    position.value = profile?.position || ''
    favoriteTeam.value = profile?.favorite_team || ''
  } catch (error) {
    console.warn('Профиль не найден или ошибка загрузки:', error)
  }
})

// сохранение профиля
const saveProfile = async () => {
  console.log('Сохранение профиля...', {
    tg_id: tgUser.value?.tg_id,
    position: position.value,
    favoriteTeam: favoriteTeam.value,
  })

  if (!tgUser.value?.tg_id) {
    errorMessage.value = 'Ошибка: не найден ID пользователя'
    return
  }

  // Проверяем, что выбраны значения
  if (!position.value) {
    errorMessage.value = 'Пожалуйста, выберите позицию'
    return
  }

  if (!favoriteTeam.value) {
    errorMessage.value = 'Пожалуйста, выберите команду'
    return
  }

  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await updatePlayerProfile(tgUser.value.tg_id, {
      position: position.value,
      favoriteTeam: favoriteTeam.value,
    })

    console.log('Профиль сохранён:', result)
    // successMessage.value = 'Профиль успешно сохранён!'

    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Ошибка сохранения профиля:', error)
    errorMessage.value = 'Ошибка при сохранении профиля'
  } finally {
    isSaving.value = false
  }
}
</script>
