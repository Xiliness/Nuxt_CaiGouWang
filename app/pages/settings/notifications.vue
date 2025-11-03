<script setup lang="ts">
/**
 * 通知设置状态管理对象
 * 使用reactive创建响应式对象，存储各种通知选项的开启状态
 * 包含以下属性：
 * - email: 邮件通知开关
 * - desktop: 桌面通知开关
 * - product_updates: 产品更新通知开关
 * - weekly_digest: 每周摘要通知开关
 * - important_updates: 重要更新通知开关
 */
const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true
})

/**
 * 通知设置区段配置
 * 定义了不同类别通知的显示信息和字段配置
 * 每个区段包含标题、描述和字段列表
 * 字段包含名称、标签和描述信息
 */
const sections = [{
  title: 'Notification channels',
  description: 'Where can we notify you?',
  fields: [{
    name: 'email',
    label: 'Email',
    description: 'Receive a daily email digest.'
  }, {
    name: 'desktop',
    label: 'Desktop',
    description: 'Receive desktop notifications.'
  }]
}, {
  title: 'Account updates',
  description: 'Receive updates about Nuxt UI.',
  fields: [{
    name: 'weekly_digest',
    label: 'Weekly digest',
    description: 'Receive a weekly digest of news.'
  }, {
    name: 'product_updates',
    label: 'Product updates',
    description: 'Receive a monthly email with all new features and updates.'
  }, {
    name: 'important_updates',
    label: 'Important updates',
    description: 'Receive emails about important updates like security fixes, maintenance, etc.'
  }]
}]

/**
 * 通知设置变更处理函数
 * 当用户切换任何通知选项时触发
 * 目前仅输出当前状态到控制台，实际应用中可以用于保存设置
 * @returns {Promise<void>} 异步函数，无返回值
 */
async function onChange() {
  // Do something with data
  console.log(state)
}
</script>

<template>
  <!-- 遍历渲染各个通知设置区段 -->
  <div v-for="(section, index) in sections" :key="index">
    <UPageCard
      :title="section.title"
      :description="section.description"
      variant="naked"
      class="mb-4"
    />

    <!-- 渲染区段内的通知选项字段 -->
    <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
      <UFormField
        v-for="field in section.fields"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :description="field.description"
        class="flex items-center justify-between not-last:pb-4 gap-2"
      >
        <USwitch
          v-model="state[field.name]"
          @update:model-value="onChange"
        />
      </UFormField>
    </UPageCard>
  </div>
</template>
