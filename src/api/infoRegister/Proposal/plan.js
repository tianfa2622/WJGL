import { get, post, delP } from '@/utils/http'

// 条件查询政协提案信息
export const searchAll = p => get('/api/CPPCC/findByPageQuery', p)

// 查询单条政协提案信息
export const searchOne = p => get('/api/CPPCC/findOneBySerialNum', p)

// 添加Api
export const Add = p => post('/api/CPPCC/insertProposal', p)

// 修改Api
export const ModifyApi = p => post(`/api/CPPCC/updateProposal`, p)

// 删除Api
export const Del = p => delP(`/api/CPPCC/deleteBySerialNum?idList=${p}`)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
