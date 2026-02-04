export const getTelegramUser = () => {
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