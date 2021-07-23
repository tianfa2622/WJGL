import { get } from '@/utils/http'

// 条件查询信息
export const searchAll = p => get('/api/bbldhd/queryAllWeekActivitySite', p)

// 导出
export const createExcel = p => get('/api/bbldhd/excelQueryAllWeekActivitySite', p)

// 查询一级目录信息
export const searchOneDirectory = () => get('/api/hdgl/querySite')
