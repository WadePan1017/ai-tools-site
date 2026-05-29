<script setup>
import { computed } from 'vue'
import { tools } from '../data/tools.js'

const featuredTools = computed(() => {
  return tools.filter(t => t.featured)
})
</script>

<template>
  <section v-if="featuredTools.length > 0" class="mb-12">
    <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      热门推荐
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="tool in featuredTools"
        :key="tool.name"
        :href="tool.affiliateUrl || tool.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-5 hover:border-amber-400/50 transition-all"
      >
        <div class="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          推荐
        </div>
        <div class="flex items-center gap-3 mb-2">
          <div :class="['w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-lg font-bold', tool.gradient]">
            {{ tool.name.charAt(0) }}
          </div>
          <div>
            <h3 class="text-white font-semibold group-hover:text-amber-400 transition-colors">{{ tool.name }}</h3>
            <span class="text-xs text-gray">{{ tool.category === 'chat' ? '聊天对话' : tool.category === 'image' ? '图像生成' : tool.category === 'video' ? '视频生成' : tool.category === 'coding' ? '编程开发' : 'AI 工具' }}</span>
          </div>
        </div>
        <p class="text-gray text-sm line-clamp-2">{{ tool.description }}</p>
      </a>
    </div>
  </section>
</template>