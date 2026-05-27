<script setup>
import { tools, categories } from '../data/tools.js'

const toolCount = tools.length
const categoryCount = categories.length - 1
</script>

<template>
  <section id="hero" class="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-16">
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-10 text-center px-6">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
        探索
        <span class="gradient-text">AI 工具</span>
        的世界
      </h1>
      <p class="text-gray max-w-xl mx-auto text-lg mb-10">
        收录优质的 AI 工具和资源，帮助你发现和使用人工智能提升效率
      </p>

      <!-- 统计数字 -->
      <div class="flex items-center justify-center gap-8 md:gap-12">
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary">{{ toolCount }}+</div>
          <div class="text-gray text-sm mt-1">收录工具</div>
        </div>
        <div class="w-px h-10 bg-dark-border"></div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary">{{ categoryCount }}</div>
          <div class="text-gray text-sm mt-1">工具分类</div>
        </div>
        <div class="w-px h-10 bg-dark-border"></div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary">免费</div>
          <div class="text-gray text-sm mt-1">无需注册</div>
        </div>
      </div>
    </div>
  </section>
</template>
