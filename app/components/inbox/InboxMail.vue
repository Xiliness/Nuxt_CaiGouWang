<script setup lang="ts">
/**
 * 邮件详情组件
 * 用于显示单封邮件的详细信息，并提供回复功能
 * @param mail - 邮件对象，包含发件人、主题、内容等信息
 */
import { format } from 'date-fns'
import type { Mail } from '~/types'

defineProps<{
  mail: Mail
}>()

const emits = defineEmits(['close'])

/**
 * 下拉菜单选项配置
 * 包含标记为未读、重要、星标和静音等操作选项
 */
const dropdownItems = [[{
  label: '标记为未读',
  icon: 'i-lucide-check-circle'
}, {
  label: '标记为重要',
  icon: 'i-lucide-triangle-alert'
}], [{
  label: '星星',
  icon: 'i-lucide-star'
}, {
  label: '猪鼻',
  icon: 'i-lucide-circle-pause'
}]]

/**
 * toast是一个通知组件，在页面右下角弹出
 */
const toast = useToast()

const reply = ref('')
const loading = ref(false)

/**
 * 处理邮件回复提交
 * 模拟发送邮件过程，1秒后显示成功提示
 */
function onSubmit() {
  loading.value = true

  setTimeout(() => {
    reply.value = ''

    toast.add({
      title: '这只是个假的邮件发送',
      description: '你的邮件已经被扔进垃圾桶了。',
      icon: 'i-lucide-check-circle',
      color: 'success'
    })

    loading.value = false
  }, 1000)
}
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
        <!-- 归档按钮 -->
        <UTooltip text="Archive">
          <UButton
            icon="i-lucide-inbox"
            color="neutral"
            variant="ghost"
          />
        </UTooltip>

        <!-- 回复按钮 -->
        <UTooltip text="Reply">
          <UButton icon="i-lucide-reply" color="neutral" variant="ghost" />
        </UTooltip>

        <!-- 更多操作下拉菜单 -->
        <UDropdownMenu :items="dropdownItems">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
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

    <!-- 邮件回复区域 -->
    <div class="pb-4 px-4 sm:px-6 shrink-0">
      <UCard variant="subtle" class="mt-auto" :ui="{ header: 'flex items-center gap-1.5 text-dimmed' }">
        <template #header>
          <UIcon name="i-lucide-reply" class="size-5" />

          <span class="text-sm truncate">
            Reply to {{ mail.from.name }} ({{ mail.from.email }})
          </span>
        </template>

        <form @submit.prevent="onSubmit">
          <UTextarea
            v-model="reply"
            color="neutral"
            variant="none"
            required
            autoresize
            placeholder="Write your reply..."
            :rows="4"
            :disabled="loading"
            class="w-full"
            :ui="{ base: 'p-0 resize-none' }"
          />

          <div class="flex items-center justify-between">
            <UTooltip text="Attach file">
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-paperclip"
              />
            </UTooltip>

            <div class="flex items-center justify-end gap-2">
              <UButton
                color="neutral"
                variant="ghost"
                label="Save draft"
              />
              <UButton
                type="submit"
                color="neutral"
                :loading="loading"
                label="Send"
                icon="i-lucide-send"
              />
            </div>
          </div>
        </form>
      </UCard>
    </div>
  </UDashboardPanel>
</template>
