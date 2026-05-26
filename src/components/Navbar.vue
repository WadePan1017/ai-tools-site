<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '分类', href: '#tools' },
  { name: '关于', href: '#about' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-dark-lighter/50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#hero" class="text-xl font-bold text-white">
        <span class="text-primary">AI</span>Tools
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="text-gray hover:text-white transition-colors text-sm"
        >
          {{ item.name }}
        </a>
      </div>

      <button class="md:hidden text-gray hover:text-white" @click="isMenuOpen = !isMenuOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-dark-light border-t border-dark-lighter">
      <a
        v-for="item in navItems"
        :key="item.name"
        :href="item.href"
        class="block px-6 py-3 text-gray hover:text-white hover:bg-dark-lighter transition-colors"
        @click="isMenuOpen = false"
      >
        {{ item.name }}
      </a>
    </div>
  </nav>
</template>
