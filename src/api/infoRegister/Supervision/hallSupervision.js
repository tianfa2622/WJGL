import { get, post, delP } from '@/utils/http'

// 条件查询厅批督办件信息
export const searchAll = p => get('/api/HallOf/findByPageQuery', p)

// 查询单条厅批督办件信息
export const searchOne = p => get('/api/HallOf/findOneBySerialNum', p)

// 添加Api
export const Add = p => post('/api/HallOf/insertSupervisionDocument', p)

// 修改Api
export const ModifyApi = p => post(`/api/HallOf/updateSupervisionDocument`, p)

// 删除Api
export const Del = p => delP(`/api/HallOf/deleteBySerialNum?idList=${p}`)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
