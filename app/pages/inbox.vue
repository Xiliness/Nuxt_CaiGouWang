<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'
import type { Mail } from '~/types'

/**
 * 标签页配置项
 * 包含"All"和"Unread"两个标签页选项
 * "All"表示显示所有邮件
 * "Unread"表示只显示未读邮件
 */
const tabItems = [{
  label: 'All',
  value: 'all'
}, {
  label: 'Unread',
  value: 'unread'
}]

/**
 * 当前选中的标签页状态
 * 默认值为'all'，即显示所有邮件
 */
const selectedTab = ref('all')

/**
 * 从API获取邮件数据
 * 使用useFetch获取/api/mails端点的数据
 * default选项设置默认值为空数组，防止数据为空时出错
 */
const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

/**
 * 过滤后的邮件列表
 * 根据选中的标签页动态过滤邮件
 * 如果选中的是'unread'标签页，则只显示未读邮件
 * 如果选中的是'all'标签页，则显示所有邮件
 */
const filteredMails = computed(() => {
  if (selectedTab.value === 'unread') {
    return mails.value.filter(mail => !!mail.unread)
  }

  return mails.value
})

/**
 * 当前选中的邮件对象
 * 用于在详情面板中展示邮件内容
 * 初始值为null，表示没有选中任何邮件
 */
const selectedMail = ref<Mail | null>()

/**
 * 控制邮件详情面板开启状态的计算属性
 * 在移动设备上会使用侧滑面板展示邮件详情
 * get方法：当selectedMail不为null时返回true，表示面板开启
 * set方法：当设置为false时，将selectedMail置为null，关闭面板
 */
const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null
    }
  }
})

/**
 * 监听过滤后的邮件列表变化
 * 当邮件列表更新时，检查当前选中的邮件是否还在列表中
 * 如果不在，则将selectedMail置为null，避免显示已不存在的邮件
 */
watch(filteredMails, () => {
  if (!filteredMails.value.find(mail => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null
  }
})

/**
 * 响应式断点检测
 * 使用VueUse的breakpointsTailwind预定义断点
 * 用于检测当前屏幕是否为移动设备
 */
const breakpoints = useBreakpoints(breakpointsTailwind)

/**
 * 移动端设备检测
 * 当屏幕宽度小于'lg'断点时，认为是移动设备
 * 用于控制在不同设备上邮件详情的展示方式
 */
const isMobile = breakpoints.smaller('lg')
</script>

<template>
  <UDashboardPanel
    id="inbox-1"
    :default-size="25"
    :min-size="20"
    :max-size="30"
    resizable
  >
    <UDashboardNavbar title="邮件库！！！">
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>
      <template #trailing>
        <!-- 显示过滤后的邮件数量 -->
        <UBadge :label="filteredMails.length" variant="subtle" />
      </template>

      <template #right>
        <!-- 邮件标签页切换控件 -->
        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="xs"
        />
      </template>
    </UDashboardNavbar>
    <!-- 邮件列表组件 -->
    <InboxList v-model="selectedMail" :mails="filteredMails" />
  </UDashboardPanel>

  <!-- 桌面端：如果选中了邮件则显示邮件详情，否则显示空 inbox 图标，inboxMail组件是邮件回复组件 -->
  <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" />
  <div v-else class="hidden lg:flex flex-1 items-center justify-center">
    <UIcon name="i-lucide-inbox" class="size-32 text-dimmed" />
  </div>

  <ClientOnly>
    <!-- 移动端：使用侧滑面板展示邮件详情 -->
    <USlideover v-if="isMobile" v-model:open="isMailPanelOpen">
      <template #content>
        <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" />
      </template>
    </USlideover>
  </ClientOnly>
</template>
