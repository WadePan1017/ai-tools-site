<script setup>
defineProps({
  position: { type: String, default: 'middle' } // 'top', 'middle', 'bottom'
})
</script>

<template>
  <div class="my-8 text-center">
    <div class="inline-block bg-dark-light border border-dark-border rounded-xl p-4 min-w-[300px]">
      <p class="text-gray text-xs mb-2">广告</p>
      <!-- 
        接入 Google AdSense 步骤:
        1. 申请 Google AdSense: https://www.google.com/adsense/
        2. 获得 publisher ID 后，替换下面的 ins 标签
        3. 把 AdSense 脚本加到 index.html 的 </body> 前
        
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-你的ID"
             data-ad-slot="广告位ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      -->
      <p class="text-gray/50 text-sm">广告位招租 - 联系邮箱: 2455177610@qq.com</p>
    </div>
  </div>
</template>