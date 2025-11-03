<script setup lang="ts">
import type { Member } from '~/types'

/**
 * 获取成员列表数据
 * 使用 useFetch 获取成员数据，如果获取失败则返回空数组
 */
const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })

/**
 * 搜索关键词
 */
const q = ref('')

/**
 * 过滤后的成员列表
 * 根据成员姓名或用户名进行模糊搜索过滤
 * @returns 匹配搜索条件的成员数组
 */
const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <div>
    <!-- 成员管理卡片 -->
    <UPageCard
      title="Members"
      description="Invite new members by email address."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        label="Invite people"
        color="neutral"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <!-- 成员列表卡片 -->
    <UPageCard variant="subtle" :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch', header: 'p-4 mb-0 border-b border-default' }">
      <template #header>
        <!-- 成员搜索框 -->
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Search members"
          autofocus
          class="w-full"
        />
      </template>

      <SettingsMembersList :members="filteredMembers" />
    </UPageCard>
  </div>
</template>
