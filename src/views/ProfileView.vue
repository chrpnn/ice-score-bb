<template>
  <div class="items-center p-8 min-h-[calc(100vh-5.5rem)]">
    <div class="bg-white rounded-2xl shadow p-4 space-y-5">
      <h2 class="text-xl font-semibold text-center">Профиль игрока</h2>
      <p class="text-center text-gray-700 font-medium">
        {{ tgUser?.name || 'Игрок' }}
        <span v-if="tgUser?.username" class="text-sm text-gray-400"> @{{ tgUser.username }} </span>
      </p>

      <!-- Аватар -->
      <div class="flex flex-col items-center gap-3">
        <div
          class="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
        >
          <img v-if="avatarPreview" :src="tgUser.avatar_url" class="w-full h-full object-cover" />
          <span v-else class="text-gray-400 text-sm"> Нет фото </span>
        </div>

        <label
          class="cursor-pointer text-sm text-blue-600 border border-blue-200 px-4 py-2 rounded-xl active:scale-[0.98]"
        >
          Загрузить фото
          <input type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
        </label>
      </div>

      <!-- Позиция -->
      <div class="space-y-1">
        <label class="text-sm text-gray-600"> Позиция на поле </label>
        <select
          v-model="position"
          class="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Выберите позицию</option>
          <option v-for="pos in positions" :key="pos" :value="pos">
            {{ pos }}
          </option>
        </select>
      </div>

      <!-- Команда -->
      <div class="space-y-1">
        <label class="text-sm text-gray-600"> Любимая команда </label>
        <select
          v-model="favoriteTeam"
          class="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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

const tgUser = ref(null)

onMounted(() => {
  tgUser.value = getTelegramUser()

  if (tgUser.value?.avatar_url) {
    avatarPreview.value = tgUser.value.avatar_url
  }
})

const avatar = ref(null)
const avatarPreview = ref(null)

const position = ref('')
const favoriteTeam = ref('')

const positions = ['Вратарь', 'Защитник', 'Нападающий', 'Универсал']

const teams = ['СКА', 'ЦСКА', 'Ак Барс', 'Авангард', 'Металлург', 'Динамо']

// сохранение профиля
const saveProfile = () => {
  const profileData = {
    position: position.value,
    favoriteTeam: favoriteTeam.value,
    avatar: avatar.value, // File (удобно для FormData)
  }

  console.log('Отправка на бек:', profileData)
}
</script>
