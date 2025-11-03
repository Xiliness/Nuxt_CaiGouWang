<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

/**
 * 定义组件属性
 * @property {boolean} collapsed - 是否折叠显示
 */
defineProps<{
  collapsed?: boolean
}>()

/**
 * 团队列表数据
 * 包含团队的标签和头像信息
 */
const teams = ref([{
  label: '成员一号迪迦奥特曼',
  avatar: {
    src: 'https://github.com/nuxt.png',
    alt: 'Nuxt'
  }
}, {
  label: '赛文奥特曼',
  avatar: {
    src: 'https://github.com/nuxt-hub.png',
    alt: 'NuxtHub'
  }
}, {
  label: '布莱泽奥特曼',
  avatar: {
    src: 'https://github.com/nuxtlabs.png',
    alt: 'NuxtLabs'
  }
}])

/**
 * 当前选中的团队
 */
const selectedTeam = ref(teams.value[0])

/**
 * 下拉菜单项配置
 * 返回一个二维数组，第一维是团队列表，第二维是操作选项
 * @returns {DropdownMenuItem[][]} 下拉菜单项数组
 */
const items = computed<DropdownMenuItem[][]>(() => {
  return [teams.value.map(team => ({
    ...team,
    onSelect() {
      // 选择团队时更新选中的团队
      selectedTeam.value = team
    }
  })), [{
    label: '创建团队',
    icon: 'i-lucide-circle-plus'
  }, {
    label: '管理团队',
    icon: 'i-lucide-cog'
  }, {
    label: '毁灭世界',
    icon: 'i-lucide-skull'
  }]]
})
</script>

<template>
  <!-- 团队选择下拉菜单 -->
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <!-- 触发按钮：显示当前选中团队信息 -->
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />
  </UDropdownMenu>
</template>
