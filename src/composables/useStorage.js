import { ref, watch } from 'vue'

function useLocalStorage(key, defaultValue) {
  const data = ref(load())

  function load() {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : defaultValue
    } catch {
      return defaultValue
    }
  }

  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(data.value))
    } catch {}
  }

  watch(data, save, { deep: true })

  return data
}

// 收藏
export function useFavorites() {
  const favorites = useLocalStorage('ai-tools-favorites', [])

  function isFavorite(name) {
    return favorites.value.includes(name)
  }

  function toggleFavorite(name) {
    if (isFavorite(name)) {
      favorites.value = favorites.value.filter(n => n !== name)
    } else {
      favorites.value.push(name)
    }
  }

  return { favorites, isFavorite, toggleFavorite }
}

// 最近访问
export function useRecentlyViewed() {
  const recentlyViewed = useLocalStorage('ai-tools-recent', [])
  const MAX_RECENT = 6

  function addRecent(toolName) {
    recentlyViewed.value = [
      toolName,
      ...recentlyViewed.value.filter(n => n !== toolName),
    ].slice(0, MAX_RECENT)
  }

  return { recentlyViewed, addRecent }
}

// 投票
export function useVotes() {
  const votes = useLocalStorage('ai-tools-votes', {})
  const myVotes = useLocalStorage('ai-tools-my-votes', [])

  function getVotes(name) {
    return votes.value[name] || 0
  }

  function hasVoted(name) {
    return myVotes.value.includes(name)
  }

  function toggleVote(name) {
    if (hasVoted(name)) {
      myVotes.value = myVotes.value.filter(n => n !== name)
      votes.value[name] = Math.max(0, (votes.value[name] || 1) - 1)
    } else {
      myVotes.value.push(name)
      votes.value[name] = (votes.value[name] || 0) + 1
    }
  }

  return { votes, myVotes, getVotes, hasVoted, toggleVote }
}
