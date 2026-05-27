<script setup>
const props = defineProps({
  tool: { type: Object, required: true }
})
</script>

<template>
  <a
    :href="tool.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group glow-card p-6 block"
  >
    <div class="relative z-10">
      <div class="flex items-start justify-between mb-3">
        <div :class="['w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-lg font-bold', tool.gradient]">
          {{ tool.name.charAt(0) }}
        </div>
        <svg class="w-5 h-5 text-dark-lighter group-hover:text-primary transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
        {{ tool.name }}
      </h3>
      <p class="text-gray text-sm mb-4 line-clamp-2">{{ tool.description }}</p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in tool.tags"
          :key="tag"
          class="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>
