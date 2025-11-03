<script setup lang="ts">
/**
 * 邮件详情组件
 * 用于显示单封邮件的详细信息，并提供回复功能
 * @param mail - 邮件对象，包含发件人、主题、内容等信息
 */
import { format } from 'date-fns'
import type { Mail } from '~/types'

// 扩展Mail类型以包含url属性
interface ZhongbiaoMail extends Mail {
  url?: string
}

const _props = defineProps<{
  mail: ZhongbiaoMail
}>()

const emits = defineEmits(['close', 'update:mail'])

/**
 * 下拉菜单选项配置
 * 包含标记为未读、重要、星标和静音等操作选项
 */
// const dropdownItems = [[{
//   label: '标记为未读',
//   icon: 'i-lucide-check-circle',
//   onSelect: () => {
//     // 通过事件发射更新父组件中的邮件状态
//     const updatedMail = { ...props.mail, unread: true }
//     emits('update:mail', updatedMail)
//   }
// }], [{
//   label: '星星',
//   icon: 'i-lucide-star'
// }, {
//   label: '猪鼻',
//   icon: 'i-lucide-circle-pause'
// }]]
</script>

<template>
  <UDashboardPanel id="inbox-2">
    <!-- 邮件详情页导航栏 -->
    <UDashboardNavbar :title="mail.subject" :toggle="false">
      <!-- 关闭按钮 -->
      <template #leading>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          class="-ms-1.5"
          @click="emits('close')"
        />
      </template>

      <template #right>
        <!-- 更多操作下拉菜单 -->
        <!-- <UDropdownMenu :items="dropdownItems">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu> -->
      </template>
    </UDashboardNavbar>

    <!-- 发件人信息和邮件时间 -->
    <div class="flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default">
      <div class="flex items-start gap-4 sm:my-1.5">
        <UAvatar
          v-bind="mail.from.avatar"
          :alt="mail.from.name"
          size="3xl"
        />

        <div class="min-w-0">
          <p class="font-semibold text-highlighted">
            {{ mail.from.name }}
          </p>
          <p class="text-muted">
            {{ mail.from.email }}
          </p>
        </div>
      </div>

      <p class="max-sm:pl-16 text-muted text-sm sm:mt-2">
        {{ format(new Date(mail.date), 'dd MMM HH:mm') }}
      </p>
    </div>

    <!-- 邮件正文内容 -->
    <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
      <p class="whitespace-pre-wrap">
        {{ mail.body }}
      </p>
    </div>
    <!-- 查看原文按钮 -->
    <div class="p-4 sm:p-6 pt-0 flex justify-center">
      <UButton
        v-if="mail.url"
        :to="mail.url"
        target="_blank"
        color="primary"
        variant="outline"
        icon="i-lucide-external-link"
      >
        查看原文
      </UButton>
    </div>
  </UDashboardPanel>
</template>
