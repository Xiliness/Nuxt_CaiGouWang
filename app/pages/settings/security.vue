<script setup lang="ts">
import * as z from 'zod'
import type { FormError } from '@nuxt/ui'

/**
 * 密码验证模式定义
 * 定义当前密码和新密码都必须至少8个字符的验证规则
 */
const passwordSchema = z.object({
  current: z.string().min(8, 'Must be at least 8 characters'),
  new: z.string().min(8, 'Must be at least 8 characters')
})

type PasswordSchema = z.output<typeof passwordSchema>

/**
 * 密码表单状态管理
 * 使用reactive创建响应式对象存储密码输入值
 */
const password = reactive<Partial<PasswordSchema>>({
  current: undefined,
  new: undefined
})

/**
 * 自定义表单验证函数
 * 验证新密码不能与当前密码相同
 * @param state - 表单状态对象，包含当前密码和新密码
 * @returns FormError[] - 验证错误数组
 */
const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    errors.push({ name: 'new', message: 'Passwords must be different' })
  }
  return errors
}
</script>

<template>
  <!-- 密码修改卡片 -->
  <UPageCard
    title="Password"
    description="Confirm your current password before setting a new one."
    variant="subtle"
  >
    <UForm
      :schema="passwordSchema"
      :state="password"
      :validate="validate"
      class="flex flex-col gap-4 max-w-xs"
    >
      <UFormField name="current">
        <UInput
          v-model="password.current"
          type="password"
          placeholder="Current password"
          class="w-full"
        />
      </UFormField>

      <UFormField name="new">
        <UInput
          v-model="password.new"
          type="password"
          placeholder="New password"
          class="w-full"
        />
      </UFormField>

      <UButton label="Update" class="w-fit" type="submit" />
    </UForm>
  </UPageCard>

  <!-- 账户删除卡片 -->
  <UPageCard
    title="Account"
    description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
    class="bg-linear-to-tl from-error/10 from-5% to-default"
  >
    <template #footer>
      <UButton label="Delete account" color="error" />
    </template>
  </UPageCard>
</template>
