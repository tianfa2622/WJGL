import { get, post, delP } from '@/utils/http'

// 条件查询人大建议信息
export const searchAll = p => get('/api/Congress/findByPageQuery', p)

// 查询单条人大建议信息
export const searchOne = p => get('/api/Congress/findOneBySerialNum', p)

// 添加Api
export const Add = p => post('/api/Congress/insertProposal', p)

// 修改Api
export const ModifyApi = p => post(`/api/Congress/updateProposal`, p)

// 删除Api
export const Del = p => delP(`/api/Congress/deleteBySerialNum?idList=${p}`)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
