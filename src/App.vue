<script setup>
import { ref, computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import ToolGrid from './components/ToolGrid.vue'
import Footer from './components/Footer.vue'
import { categories, tools } from './data/tools.js'

const activeCategory = ref('all')
const searchQuery = ref('')

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
          v-model="searchQuery"
          type="text"
          placeholder="搜索 AI 工具..."
          class="w-full pl-12 pr-4 py-3 bg-dark-light border border-dark-lighter rounded-xl text-white placeholder-gray focus:outline-none focus:border-primary transition-colors"
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
              : 'bg-dark-light border border-dark-lighter text-gray hover:text-white hover:border-primary/30'
          ]"
        >
          <span class="mr-1">{{ cat.icon }}</span>{{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <ToolGrid :tools="filteredTools" />
  </main>
  <Footer />
</template>
