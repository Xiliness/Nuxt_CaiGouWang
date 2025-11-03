<script setup lang="ts">
import { eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { Period, Range } from '~/types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

const props = defineProps<{
  period: Period
  range: Range
}>()

/**
 * 数据记录类型定义
 * @typedef {Object} DataRecord
 * @property {Date} date - 日期
 * @property {number} amount - 金额
 */
type DataRecord = {
  date: Date
  amount: number
}

const { width } = useElementSize(cardRef)

const data = ref<DataRecord[]>([])

/**
 * 监听周期和范围变化，重新计算图表数据
 * 当period或range属性发生变化时，根据设定的时间间隔生成日期数组，
 * 并为每个日期生成一个随机金额值（1000到10000之间）
 */
watch([() => props.period, () => props.range], () => {
  const dates = ({
    daily: eachDayOfInterval,
    weekly: eachWeekOfInterval,
    monthly: eachMonthOfInterval
  } as Record<Period, typeof eachDayOfInterval>)[props.period](props.range)

  const min = 1000
  const max = 10000

  data.value = dates.map(date => ({ date, amount: Math.floor(Math.random() * (max - min + 1)) + min }))
}, { immediate: true })

/**
 * 获取数据项索引作为X轴坐标
 * @param {DataRecord} _ - 数据项（未使用）
 * @param {number} i - 数据项索引
 * @returns {number} 数据项索引
 */
const x = (_: DataRecord, i: number) => i

/**
 * 获取数据项金额作为Y轴坐标
 * @param {DataRecord} d - 数据项
 * @returns {number} 金额值
 */
const y = (d: DataRecord) => d.amount

/**
 * 计算总金额
 * @returns {number} 所有数据项金额的总和
 */
const total = computed(() => data.value.reduce((acc: number, { amount }) => acc + amount, 0))

/**
 * 格式化数字为货币显示格式
 * @type {Intl.NumberFormat}
 */
const formatNumber = new Intl.NumberFormat('en', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format

/**
 * 根据周期格式化日期显示
 * @param {Date} date - 需要格式化的日期
 * @returns {string} 格式化后的日期字符串
 */
const formatDate = (date: Date): string => {
  return ({
    daily: format(date, 'd MMM'),
    weekly: format(date, 'd MMM'),
    monthly: format(date, 'MMM yyy')
  })[props.period]
}

/**
 * X轴刻度标签格式化函数
 * @param {number} i - 数据索引
 * @returns {string} 格式化后的刻度标签文本
 */
const xTicks = (i: number) => {
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }

  return formatDate(data.value[i].date)
}

/**
 * 提示信息模板函数
 * @param {DataRecord} d - 数据项
 * @returns {string} 格式化后的提示信息
 */
const template = (d: DataRecord) => `${formatDate(d.date)}: ${formatNumber(d.amount)}`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Revenue
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formatNumber(total) }}
        </p>
      </div>
    </template>

    <VisXYContainer
      :data="data"
      :padding="{ top: 40 }"
      class="h-96"
      :width="width"
    >
      <VisLine
        :x="x"
        :y="y"
        color="var(--ui-primary)"
      />
      <VisArea
        :x="x"
        :y="y"
        color="var(--ui-primary)"
        :opacity="0.1"
      />

      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTicks"
      />

      <VisCrosshair
        color="var(--ui-primary)"
        :template="template"
      />

      <VisTooltip />
    </VisXYContainer>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
