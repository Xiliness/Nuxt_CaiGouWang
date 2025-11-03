<script setup lang="ts">
// 获取颜色模式实例，用于控制主题颜色
const colorMode = useColorMode()

// 计算属性，根据当前颜色模式返回相应的主题颜色值
const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

// 设置页面头部信息
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

// 页面标题和描述信息
const title = '采购信息管理系统'
const description = '便捷的采购信息管理系统，助力高效采购决策。'

// 设置SEO元数据信息
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <!-- 页面加载指示器 -->
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
