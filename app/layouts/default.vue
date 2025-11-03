<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

/**
 * 定义导航链接菜单项
 * 包含两个主要部分：主要导航链接和辅助链接（如反馈和帮助）
 */
const links = [[{
  label: '中标公告',
  icon: 'i-lucide-file-text',
  to: '/zhongbiaogonggao',
  onSelect: () => {
    open.value = false
  }
}, {
  label: '采购公告',
  icon: 'i-lucide-file-text',
  to: '/caigougonggao',
  onSelect: () => {
    open.value = false
  }
}]] satisfies NavigationMenuItem[][]

/**
 * 计算搜索分组数据
 * 包含导航链接和页面源码链接
 */
const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: '查看网页源码',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

/**
 * 组件挂载时检查cookie同意状态
 * 如果用户未同意cookie使用，则显示提示消息
 */
onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: '请你让我们吃点曲奇饼干🍪',
    duration: 0,
    close: false,
    actions: [{
      label: '我接受',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: '不行！！！！',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <!-- 为整个页面添加背景图片 style="background-image: url('/background.png')" -->
  <UDashboardGroup unit="rem" class="bg-cover bg-center bg-no-repeat" style="background-image: url('/background.png')">
    <!-- 主侧边栏容器，支持折叠和调整大小；bg-elevated是不透明度 -->
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/90"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <div v-if="collapsed" class="flex items-center justify-center p-2">
          <span class="text-lg font-bold">采</span>
        </div>
        <div v-else class="p-2">
          <input
            type="text"
            value="采购信息管理系统"
            class="w-full px-3 py-2 text-base font-bold bg-transparent border-none focus:outline-none focus:ring-0"
            readonly
          >
        </div>
      </template>

      <template #default="{ collapsed }">
        <!-- 搜索按钮组件，根据侧边栏状态调整显示方式 -->
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <!-- 主导航菜单，包含主要功能链接 -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <!-- 底部导航菜单，包含辅助链接（如反馈和帮助） -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <!-- 全局搜索组件，提供快速跳转功能 -->
    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
