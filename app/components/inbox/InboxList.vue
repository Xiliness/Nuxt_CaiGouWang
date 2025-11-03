<script setup lang="ts">
/**
 * 收件箱邮件列表组件
 * 用于显示邮件列表，支持选中、滚动定位和键盘导航功能
 *
 * @param mails - 邮件数组，用于渲染邮件列表
 */

import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

const props = defineProps<{
  mails: Mail[]
}>()

const mailsRefs = ref<Element[]>([])

/**
 * 当前选中的邮件
 * 使用defineModel实现双向绑定，父组件可以使用v-model:selected-mail来获取或设置选中的邮件
 */
const selectedMail = defineModel<Mail | null>()

/**
 * 监听选中邮件变化
 * 当选中的邮件发生变化时，自动滚动到该邮件位置
 */
watch(selectedMail, () => {
  if (!selectedMail.value) {
    return
  }
  const ref = mailsRefs.value[selectedMail.value.id]
  if (ref) {
    ref.scrollIntoView({ block: 'nearest' })
  }
})

/**
 * 定义键盘快捷键
 * 支持使用上下箭头键在邮件列表中导航
 */
defineShortcuts({
  /**
   * 向下箭头键处理函数
   * 选中下一封邮件，如果当前没有选中则选中第一封邮件
   */
  arrowdown: () => {
    const index = props.mails.findIndex(mail => mail.id === selectedMail.value?.id)

    if (index === -1) {
      selectedMail.value = props.mails[0]
    } else if (index < props.mails.length - 1) {
      selectedMail.value = props.mails[index + 1]
    }
  },
  /**
   * 向上箭头键处理函数
   * 选中上一封邮件，如果当前没有选中则选中最后一封邮件
   */
  arrowup: () => {
    const index = props.mails.findIndex(mail => mail.id === selectedMail.value?.id)

    if (index === -1) {
      selectedMail.value = props.mails[props.mails.length - 1]
    } else if (index > 0) {
      selectedMail.value = props.mails[index - 1]
    }
  }
})
</script>

<template>
  <div class="overflow-y-auto divide-y divide-default bg-elevated/50">
    <div
      v-for="(mail, index) in mails"
      :key="index"
      :ref="el => { mailsRefs[mail.id] = el as Element }"
    >
      <!-- 邮件项 -->
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="[
          mail.unread ? 'text-highlighted' : 'text-toned',
          selectedMail && selectedMail.id === mail.id
            ? 'border-primary bg-primary/10'
            : 'border-bg hover:border-primary hover:bg-primary/5'
        ]"
        @click="selectedMail = mail"
      >
        <!-- 邮件头部信息：发件人和日期 -->
        <div class="flex items-center justify-between" :class="[mail.unread && 'font-semibold']">
          <div class="flex items-center gap-3">
            {{ mail.from.name }}

            <!-- 未读标记 -->
            <UChip v-if="mail.unread" />
          </div>

          <!-- 格式化显示邮件日期 -->
          <span>{{ isToday(new Date(mail.date)) ? format(new Date(mail.date), 'HH:mm') : format(new Date(mail.date), 'dd MMM') }}</span>
        </div>
        <!-- 邮件主题 -->
        <p class="truncate" :class="[mail.unread && 'font-semibold']">
          {{ mail.subject }}
        </p>
        <!-- 邮件正文预览 -->
        <p class="text-dimmed line-clamp-1">
          {{ mail.body }}
        </p>
      </div>
    </div>
  </div>
</template>
