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

// 将API数据转换为前端使用的ProcurementInfo格式
function transformApiData(apiData: ApiProcurementData[], _keyword: string) {
  return apiData.map((item, index) => ({
    id: index + 1,
    unread: true, // 默认设置为未读
    from: {
      id: index + 1,
      name: item.procurer || '未知采购单位',
      email: '',
      status: 'subscribed',
      location: item.region || '未知地区'
    },
    projectName: item.procurement_name || '未知项目',
    subject: item.title,
    body: item.origin_text,
    date: item.publishing_time,
    amount: item.monetary_value,
    url: item.url
    // 可以从summary_table或其他字段中提取更多详细信息
  }))
}

export default defineEventHandler(async (event) => {
  try {
    // 从查询参数获取keyword，如果没有提供则使用默认值
    const query = getQuery(event)
    const keyword = query.keyword && query.keyword !== '' ? query.keyword : '新华三'

    // 构建目标API URL
    const apiUrl = `http://113.240.112.142:18080/info/fulltext?keyword=${encodeURIComponent(keyword as string)}`

    // 发起请求到外部API
    const response = await fetch(apiUrl)

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 解析JSON数据
    const result = await response.json()

    // 检查返回的数据结构 - 根据实际API响应结构调整
    if (result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'data') && Array.isArray(result.data)) {
      // 转换数据格式以匹配前端需要的ProcurementInfo类型
      const transformedData = transformApiData(result.data, keyword as string)
      return transformedData
    } else {
      console.error('API返回的数据结构不正确:', result)
      return []
    }
  } catch (error) {
    console.error('获取中标信息时出错:', error)

    // 返回错误信息
    return {
      error: true,
      message: '获取中标信息失败',
      details: (error as Error).message
    }
  }
})
