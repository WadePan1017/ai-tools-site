<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import ToolGrid from './components/ToolGrid.vue'
import Footer from './components/Footer.vue'
import { categories, tools } from './data/tools.js'
import { useRecentlyViewed } from './composables/useStorage.js'

const activeCategory = ref('all')
const searchQuery = ref('')
const searchInput = ref(null)
const { recentlyViewed, addRecent } = useRecentlyViewed()

const filteredTools = computed(() => {
  let result = tools
  if (activeCategory.value !== 'all') {
    result = result.filter(t => t.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }
  return result
})

const recentTools = computed(() => {
  return recentlyViewed.value
    .map(name => tools.find(t => t.name === name))
    .filter(Boolean)
})

const isSearching = computed(() => searchQuery.value.trim() || activeCategory.value !== 'all')

function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchInput.value?.focus()
  }
  if (e.key === 'Escape') {
    searchInput.value?.blur()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Navbar />
  <Hero />
  <main class="max-w-6xl mx-auto px-6 py-12">
    <!-- Search & Filter -->
    <div class="mb-10 space-y-6">
      <!-- Search -->
      <div class="relative max-w-md mx-auto">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="搜索 AI 工具... (Ctrl+K)"
          class="w-full pl-12 pr-4 py-3 bg-dark-light border border-dark-border rounded-xl text-white placeholder-gray focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            activeCategory === cat.id
              ? 'bg-primary text-white'
              : 'bg-dark-light border border-dark-border text-gray hover:text-white hover:border-primary/30'
          ]"
        >
          <span class="mr-1">{{ cat.icon }}</span>{{ cat.name }}
        </button>
      </div>
    </div>

    <!-- 搜索结果计数 -->
    <div v-if="isSearching" class="text-center mb-6">
      <span class="text-gray text-sm">
        找到 <span class="text-primary font-semibold">{{ filteredTools.length }}</span> 个工具
      </span>
    </div>

    <!-- 最近访问 -->
    <div v-if="!isSearching && recentTools.length > 0" class="mb-10">
      <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        最近访问
      </h2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="tool in recentTools"
          :key="tool.name"
          :href="tool.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-dark-light border border-dark-border rounded-xl text-sm text-gray hover:text-white hover:border-primary/30 transition-all"
        >
          <div :class="['w-6 h-6 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold', tool.gradient]">
            {{ tool.name.charAt(0) }}
          </div>
          {{ tool.name }}
        </a>
      </div>
    </div>

    <!-- Results -->
    <ToolGrid :tools="filteredTools" :on-visit="addRecent" />
  </main>
  <Footer />
</template>
