<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'

/**
 * 从仪表板状态中获取通知侧边栏开启状态
 */
const { isNotificationsSlideoverOpen } = useDashboard()

/**
 * 下拉菜单项配置
 * 包含创建新邮件和新客户的选项
 */
const items = [[{
  label: '新邮件',
  icon: 'i-lucide-send',
  to: '/inbox'
}, {
  label: '新客户',
  icon: 'i-lucide-user-plus',
  to: '/customers'
}]] satisfies DropdownMenuItem[][]

/**
 * 时间范围初始值，设置为最近14天
 */
const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})

/**
 * 时间周期类型，默认为 daily（每日）
 */
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="主页哈" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <!-- 通知按钮 -->
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <!-- 创建新项目下拉菜单 -->
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <!-- 主要内容区域 -->
      <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
      <HomeSales :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>
