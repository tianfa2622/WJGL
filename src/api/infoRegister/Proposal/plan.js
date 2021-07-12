import { get, post, delP, put } from '@/utils/http'

// 条件查询政协提案信息
export const searchAll = p => get('/api/CPPCC/findByPageQuery', p)

// 条件查询可推送人员信息
export const searchCanPush = p => get('/api/universal/queryPushMessage', p)

// 条件查询已推送人员信息
export const searchAlreadyPush = p => get('/api/universal/selectAdminPush', p)

// 查询单条政协提案信息
export const searchOne = p => get('/api/CPPCC/findOneBySerialNum', p)

// 添加Api
export const Add = p => post('/api/CPPCC/insertProposal', p)

// 修改Api
export const ModifyApi = (id, p) => put(`/api/CPPCC/updateProposal?id=${id}`, p)

// 删除Api
export const Del = p => delP(`/api/CPPCC/deleteBySerialNum?idList=${p}`)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')
