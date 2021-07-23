import { get } from '@/utils/http'

// 条件查询提案信息
export const searchAll = p => get('/api/FileReport/findProposalsList', p)

// 导出
export const createExcel = p => get('/api/FileReport/proposalChartExcel', p)

// 一键导出
// export const createExcelAll = p => get('/api/FileReport/fileCpjCreateExcel', p)
