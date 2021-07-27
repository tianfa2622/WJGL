import { get } from '@/utils/http'

// 条件查询日志信息
export const searchAll = p => get('/logController/getAllLog', p)

// 查询单条上级来文信息
export const searchOne = p => get('/api/sjlw/querySjlwOne', p)
