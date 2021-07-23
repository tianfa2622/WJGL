import { get } from '@/utils/http'

// 条件查询信息
export const searchAll = p => get('/api/bbldhd/queryOneWeek', p)

// 导出
export const createExcel = p => get('/api/bbldhd/excelQueryOneWeek', p)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
