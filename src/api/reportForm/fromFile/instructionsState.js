import { get } from '@/utils/http'

// 条件查询信息
export const searchAll = p => get('/api/FileReport/findCpjCreatDate', p)

// 导出
export const createExcel = p => get('/api/FileReport/fileCpjCreatDateCreateExce', p)

// 一键导出
export const createExcelAll = p => get('/api/FileReport/fileCpjCreateExcel', p)
