<script setup>
import ToolCard from './ToolCard.vue'

defineProps({
  tools: { type: Array, required: true }
})
</script>

<template>
  <div id="tools" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ToolCard v-for="tool in tools" :key="tool.name" :tool="tool" />
  </div>

  <div v-if="tools.length === 0" class="text-center py-20">
    <div class="text-5xl mb-4">🔍</div>
    <h3 class="text-xl text-white font-semibold mb-2">未找到匹配的工具</h3>
    <p class="text-gray">尝试调整搜索关键词或筛选条件</p>
  </div>
</template>
