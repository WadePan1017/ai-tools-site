<script setup>
import { computed, ref } from 'vue'
import { useFavorites, useVotes } from '../composables/useStorage.js'

const props = defineProps({
  tool: { type: Object, required: true },
  onVisit: { type: Function, default: () => {} }
})

const { isFavorite, toggleFavorite } = useFavorites()
const { getVotes, hasVoted, toggleVote } = useVotes()

const isNew = computed(() => {
  if (!props.tool.addedAt) return false
  const diff = Date.now() - new Date(props.tool.addedAt).getTime()
  return diff < 7 * 24 * 60 * 60 * 1000
})

const pricingLabel = computed(() => {
  const map = { free: '免费', paid: '付费', freemium: '免费增值' }
  return map[props.tool.pricing] || ''
})

const pricingClass = computed(() => {
  const map = {
    free: 'pricing-free',
    paid: 'pricing-paid',
    freemium: 'pricing-freemium',
  }
  return map[props.tool.pricing] || ''
})

const faviconUrl = computed(() => {
  try {
    const host = new URL(props.tool.url).hostname
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
  } catch {
    return ''
  }
})

const iconError = ref(false)

function handleClick() {
  props.onVisit(props.tool.name)
}
</script>

<template>
  <a
    :href="tool.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group glow-card p-6 block"
    @click="handleClick"
  >
    <div class="relative z-10">
      <!-- 顶部：图标 + 操作按钮 -->
      <div class="flex items-start justify-between mb-3">
        <div class="relative">
          <div
            v-if="faviconUrl && !iconError"
            class="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-dark-lighter"
          >
            <img
              :src="faviconUrl"
              :alt="tool.name"
              class="w-full h-full object-cover"
              @error="iconError = true"
            />
          </div>
          <div
            v-else
            :class="['w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-lg font-bold', tool.gradient]"
          >
            {{ tool.name.charAt(0) }}
          </div>
          <!-- NEW 角标 -->
          <span v-if="isNew" class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            NEW
          </span>
        </div>

        <div class="flex items-center gap-2">
          <!-- 定价标签 -->
          <span v-if="pricingLabel" :class="['text-xs px-2 py-0.5 rounded-full', pricingClass]">
            {{ pricingLabel }}
          </span>
          <!-- 收藏按钮 -->
          <button
            @click.prevent.stop="toggleFavorite(tool.name)"
            class="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
            :class="isFavorite(tool.name) ? 'text-rose-400' : 'text-dark-lighter hover:text-rose-400'"
          >
            <svg class="w-4 h-4" :fill="isFavorite(tool.name) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 标题 + 描述 -->
      <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
        {{ tool.name }}
      </h3>
      <p class="text-gray text-sm mb-4 line-clamp-2">{{ tool.description }}</p>

      <!-- 底部：标签 + 投票 -->
      <div class="flex items-center justify-between">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in tool.tags"
            :key="tag"
            class="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 投票按钮 -->
        <button
          @click.prevent.stop="toggleVote(tool.name)"
          class="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-all shrink-0 ml-2"
          :class="hasVoted(tool.name) ? 'bg-primary/20 text-primary' : 'bg-dark-lighter text-gray hover:text-primary'"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          {{ getVotes(tool.name) || '' }}
        </button>
      </div>
    </div>
  </a>
</template>
