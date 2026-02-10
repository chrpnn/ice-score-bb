export const getTelegramUser = () => {


  // 🧪 DEV MOCK
  if (import.meta.env.DEV) {
    return {
      tg_id: '999999999',
      name: 'Dev Tester',
      username: 'dev_user',
      avatar_url: 'https://s0.rbk.ru/v6_top_pics/media/img/6/83/347551821477836.jpeg',
    }
  }

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
