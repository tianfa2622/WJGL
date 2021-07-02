// eslint-disable-next-line no-unused-vars
import axios, { get, post } from '@/utils/http'

// 条件查询呈批件文件信息
export const searchAll = p => get('/api/cpj/conditionPageQueryCpt', p)

export const Add = p => post('/api/cpj/insertCpj', p)
