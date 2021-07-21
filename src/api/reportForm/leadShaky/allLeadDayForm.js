import { get } from '@/utils/http'

// 条件查询信息
export const searchAll = p => get('/api/bbldhd/queryAllDayActivity', p)

// 导出
export const createExcel = p => get('/api/bbldhd/excelQueryAllDayActivity', p)
