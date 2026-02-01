function percentile(value, sortedArray) {
  let count = 0
  for (const v of sortedArray) {
    if (v < value) count++
  }
  return count / sortedArray.length
}

function scale(percentile) {
  return Math.round(50 + percentile * 49)
}

export function calculateRatings(player, allPlayers) {
  const confidence = Math.min(1, player.games / 8)

  const safeDiv = (a, b) => (b ? a / b : 0)

  const metrics = {
    SHT: allPlayers.map((p) => safeDiv(p.goals, p.games)),
    HND: allPlayers.map((p) => safeDiv(p.assists, p.games)),
    SKT: allPlayers.map((p) => safeDiv(p.goals + p.assists, p.games)),
    CHK: allPlayers.map((p) => p.goals * 1.5 + p.assists),
  }

  Object.values(metrics).forEach((arr) => arr.sort((a, b) => a - b))

  function calc(value, arr) {
    const raw = scale(percentile(value, arr))
    return Math.round(50 + (raw - 50) * confidence)
  }

  const ratings = {
    SHT: calc(player.goals / player.games, metrics.SHT),
    HND: calc(player.assists / player.games, metrics.HND),
    SKT: calc((player.goals + player.assists) / player.games, metrics.SKT),
    CHK: calc(player.goals * 1.5 + player.assists, metrics.CHK),
  }

  ratings.OVR = Math.round(
    ratings.SHT * 0.3 + ratings.HND * 0.25 + ratings.SKT * 0.25 + ratings.CHK * 0.2,
  )

  return ratings
}