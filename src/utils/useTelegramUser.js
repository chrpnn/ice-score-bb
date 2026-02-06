export const getTelegramUser = () => {


  // 🧪 DEV MOCK
  // if (import.meta.env.DEV) {
  //   return {
  //     tg_id: '999999999',
  //     name: 'Dev Tester',
  //     username: 'dev_user',
  //     avatar_url: null,
  //   }
  // }

  if (!window.Telegram?.WebApp) return null

  const user = window.Telegram.WebApp.initDataUnsafe?.user

  if (!user) return null

  return {
    tg_id: user.id,
    name: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
    username: user.username ?? null,
    avatar_url: user.photo_url ?? null,
  }
}
