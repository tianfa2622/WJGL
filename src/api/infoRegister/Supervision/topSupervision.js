import { get, post, delP } from '@/utils/http'

// 条件查询上级督办件信息
export const searchAll = p => get('/api/SupervisionDocument/findByPageQuery', p)

// 查询单条上级督办件信息
export const searchOne = p => get('/api/SupervisionDocument/findOneBySerialNum', p)

// 添加Api
export const Add = p => post('/api/SupervisionDocument/insertSupervisionDocument', p)

// 修改Api
export const ModifyApi = p => post('/api/SupervisionDocument/updateSupervisionDocument', p)

// 删除Api
export const Del = p => delP(`/api/SupervisionDocument/deleteBySerialNum?idList=${p}`)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
