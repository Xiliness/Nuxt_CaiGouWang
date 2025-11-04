<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import ZhongbiaogonggaoMail from '~/components/zhongbiaogonggao/ZhongbiaogonggaoMail.vue'
import type { Mail } from '~/types'

/**
 * 标签页配置项
 * 包含"All"和"Unread"两个标签页选项
 * "All"表示显示所有中标公告
 * "Unread"表示只显示未读中标公告
 */
const tabItems = [{
  label: '全部',
  value: 'all'
}, {
  label: '未读',
  value: 'unread'
}]

/**
 * 当前选中的标签页状态
 * 默认值为'all'，即显示所有中标公告
 */
const selectedTab = ref('all')

/**
 * 从API获取中标公告数据
 * 使用useFetch获取/api/zhongbiaogonggao端点的数据
 * default选项设置默认值为空数组，防止数据为空时出错
 */
const { data: mails } = await useFetch<Mail[]>('/api/zhongbiaogonggao', { default: () => [] })

// 在获取到邮件数据后，恢复已读状态
onBeforeMount(() => {
  restoreReadStatus()
})

/**
 * 恢复邮件的已读状态
 * 从localStorage中读取已读邮件ID列表，并更新当前邮件状态
 */
function restoreReadStatus() {
  const readMailIds = JSON.parse(localStorage.getItem('zhongbiaogonggao_read_mails') || '[]')
  mails.value.forEach((mail) => {
    if (readMailIds.includes(mail.id)) {
      mail.unread = false
    }
  })
}

/**
 * 保存已读状态到localStorage
 * @param mailId 邮件ID
 * @param unread 是否未读
 */
function saveReadStatus(mailId: number, unread: boolean) {
  const readMailIds = JSON.parse(localStorage.getItem('zhongbiaogonggao_read_mails') || '[]')
  const readMailIdIndex = readMailIds.indexOf(mailId)
  if (!unread && readMailIdIndex === -1) {
    // 标记为已读，添加到已读列表
    readMailIds.push(mailId)
  } else if (unread && readMailIdIndex !== -1) {
    // 标记为未读，从已读列表中移除
    readMailIds.splice(readMailIdIndex, 1)
  }
  localStorage.setItem('zhongbiaogonggao_read_mails', JSON.stringify(readMailIds))
}

/**
 * 更新指定公告的已读状态
 * @param mailId 公告ID
 * @param unread 是否为未读状态
 */
function updateMailStatus(mailId: number, unread: boolean) {
  const mail = mails.value.find(m => m.id === mailId)
  if (mail) {
    mail.unread = unread
    saveReadStatus(mailId, unread)
  }
}

/**
 * 处理来自子组件的邮件更新事件
 * @param updatedMail 更新后的邮件对象
 */
function handleMailUpdate(updatedMail: Mail) {
  const index = mails.value.findIndex(m => m.id === updatedMail.id)
  if (index !== -1) {
    mails.value[index] = updatedMail
    // 同步更新selectedMail引用
    if (selectedMail.value && selectedMail.value.id === updatedMail.id) {
      selectedMail.value = updatedMail
    }
    // 保存状态到localStorage
    saveReadStatus(updatedMail.id, updatedMail.unread ?? true)
  }
}

/**
 * 过滤后的中标公告列表
 * 根据选中的标签页动态过滤中标公告
 * 如果选中的是'unread'标签页，则只显示未读中标公告
 * 如果选中的是'all'标签页，则显示所有中标公告
 */
const filteredMails = computed(() => {
  if (selectedTab.value === 'unread') {
    return mails.value.filter((mail: Mail) => !!mail.unread)
  }

  return mails.value
})

/**
 * 当前选中的中标公告对象
 * 用于在详情面板中展示中标公告内容
 * 初始值为null，表示没有选中任何中标公告
 */
const selectedMail = ref<Mail | null>()

// 监听选中的公告变化，当用户查看公告时将其标记为已读
watch(selectedMail, (newMail) => {
  if (newMail && newMail.unread) {
    updateMailStatus(newMail.id, false)
  }
})

/**
 * 控制中标公告详情面板开启状态的计算属性
 * 在移动设备上会使用侧滑面板展示中标公告详情
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
 * 监听过滤后的中标公告列表变化
 * 当中标公告列表更新时，检查当前选中的中标公告是否还在列表中
 * 如果不在，则将selectedMail置为null，避免显示已不存在的中标公告
 */
watch(filteredMails, () => {
  if (!filteredMails.value.find((mail: Mail) => mail.id === selectedMail.value?.id)) {
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
 * 用于控制在不同设备上中标公告详情的展示方式
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
    <UDashboardNavbar title="中标公告" class="bg-elevated/50">
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>
      <template #trailing>
        <!-- 显示过滤后的中标公告数量 -->
        <UBadge :label="filteredMails.length" variant="subtle" />
      </template>
      <template #right>
        <!-- 中标公告标签页切换控件 -->
        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="xs"
        />
      </template>
    </UDashboardNavbar>
    <!-- 中标公告列表组件 -->
    <InboxList v-model="selectedMail" :mails="filteredMails" />
  </UDashboardPanel>

  <!-- 桌面端：如果选中了中标公告则显示中标公告详情，否则显示空 inbox 图标 -->
  <ZhongbiaogonggaoMail
    v-if="selectedMail"
    :mail="selectedMail"
    @close="selectedMail = null"
    @update:mail="handleMailUpdate"
  />
  <div v-else class="hidden lg:flex flex-1 items-center justify-center">
    <UIcon name="i-lucide-inbox" class="size-32 text-dimmed" />
  </div>

  <ClientOnly>
    <!-- 移动端：使用侧滑面板展示中标公告详情 -->
    <USlideover v-if="isMobile" v-model:open="isMailPanelOpen">
      <template #content>
        <ZhongbiaogonggaoMail
          v-if="selectedMail"
          :mail="selectedMail"
          @close="selectedMail = null"
          @update:mail="handleMailUpdate"
        />
      </template>
    </USlideover>
  </ClientOnly>
</template>
