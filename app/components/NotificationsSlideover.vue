<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import type { Notification } from '~/types'

/**
 * 使用仪表盘状态管理，获取通知侧边栏开启状态
 */
const { isNotificationsSlideoverOpen } = useDashboard()

/**
 * 获取通知数据
 * 从/api/notifications接口获取通知列表数据
 */
const { data: notifications } = await useFetch<Notification[]>('/api/notifications')
</script>

<template>
  <USlideover
    v-model:open="isNotificationsSlideoverOpen"
    title="通知"
  >
    <template #body>
      <!-- 遍历显示通知列表 -->
      <NuxtLink
        v-for="notification in notifications"
        :key="notification.id"
        :to="`/inbox?id=${notification.id}`"
        class="px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
      >
        <!-- 未读通知标记 -->
        <UChip
          color="error"
          :show="!!notification.unread"
          inset
        >
          <UAvatar
            v-bind="notification.sender.avatar"
            :alt="notification.sender.name"
            size="md"
          />
        </UChip>

        <div class="text-sm flex-1">
          <p class="flex items-center justify-between">
            <!-- 发送者姓名 -->
            <span class="text-highlighted font-medium">{{ notification.sender.name }}</span>

            <!-- 通知时间，使用相对时间显示 -->
            <time
              :datetime="notification.date"
              class="text-muted text-xs"
              v-text="formatTimeAgo(new Date(notification.date))"
            />
          </p>

          <!-- 通知内容 -->
          <p class="text-dimmed">
            {{ notification.body }}
          </p>
        </div>
      </NuxtLink>
    </template>
  </USlideover>
</template>
