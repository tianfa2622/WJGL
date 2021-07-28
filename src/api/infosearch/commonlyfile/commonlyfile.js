import { get, excelGet } from '@/utils/http'

// 条件查询信息
export const searchAll = p => get('/api/ybwj/queryConditionMgYbwj', p)

// 导出
export const createExcel = p => excelGet('/api/ybwj/downloadYbwjExcel', p)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
