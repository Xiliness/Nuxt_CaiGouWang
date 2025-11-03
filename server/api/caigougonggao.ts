import { defineEventHandler } from 'h3'

// 定义API返回的数据结构
interface ApiProcurementData {
  id: string
  title: string
  type: string
  publishing_time: string
  region: string | null
  procurer: string
  url: string
  procurement_name: string
  monetary_value: string
  item: string | null
  cargo_type: string | null
  summary_table: string
  origin_text: string
  create_at: string
  status: number
  process_status: number
  main_subject_info: string | null
  cargo_count: string | null
  score: number
}

// 将API数据转换为前端使用的Mail格式
function transformApiData(apiData: ApiProcurementData[]) {
  return apiData.map((item, index) => ({
    id: index + 1,
    unread: true, // 默认设置为未读
    from: {
      id: index + 1,
      name: item.procurer || '未知采购单位',
      email: '',
      status: 'subscribed' as const,
      location: item.region || '未知地区'
    },
    projectName: item.procurement_name || '未知项目',
    subject: item.title,
    body: item.origin_text,
    date: item.publishing_time,
    amount: item.monetary_value,
    url: item.url
  }))
}

export default defineEventHandler(async (_event) => {
  try {
    // 使用固定的关键词"菜籽"来查询采购公告，根据api.md中的说明
    const keyword = '菜籽'

    // 构建目标API URL，根据api.md中的说明
    const apiUrl = `http://113.240.112.142:18080/info?keyword=${encodeURIComponent(keyword)}`

    // 设置请求超时
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时

    // 发起请求到外部API
    const response = await fetch(apiUrl, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 解析JSON数据
    const result = await response.json()

    // 检查返回的数据结构
    if (result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'data') && Array.isArray(result.data)) {
      // 转换数据格式以匹配前端需要的Mail类型
      const transformedData = transformApiData(result.data)
      return transformedData
    } else {
      console.error('API返回的数据结构不正确:', result)
      return []
    }
  } catch (error) {
    console.error('获取采购公告信息时出错:', error)

    // 返回空数组而不是错误对象，保持数据类型一致性
    return []
  }
})
