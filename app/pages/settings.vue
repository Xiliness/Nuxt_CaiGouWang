<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

/**
 * 定义设置页面的导航链接
 * 每个链接包含标签、图标、路由路径等信息
 * 第一个数组包含内部导航链接，第二个数组包含外部链接
 */
const links = [[{
  label: '通用',
  icon: 'i-lucide-user',
  to: '/settings',
  exact: true
}, {
  label: '成员',
  icon: 'i-lucide-users',
  to: '/settings/members'
}, {
  label: '提醒',
  icon: 'i-lucide-bell',
  to: '/settings/notifications'
}, {
  label: '安全',
  icon: 'i-lucide-shield',
  to: '/settings/security'
}], [{
  label: '随便什么网站',
  icon: 'i-lucide-book-open',
  to: 'https://www.mcmod.cn/class/612.html',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <!-- 设置页面主面板 -->
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <!-- 页面头部区域 -->
    <template #header>
      <!-- 导航栏 -->
      <UDashboardNavbar title="设置">
        <template #leading>
          <!-- 侧边栏折叠按钮 -->
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <!-- 工具栏 -->
      <UDashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <!-- 导航菜单，显示设置页面的各个链接 -->
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </UDashboardToolbar>
    </template>

    <!-- 页面主体内容 -->
    <template #body>
      <!-- 内容容器，居中显示并限制最大宽度 -->
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
        <!-- 渲染子路由页面 -->
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
