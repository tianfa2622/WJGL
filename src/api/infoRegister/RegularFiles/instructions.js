// eslint-disable-next-line no-unused-vars
import axios, { get, post, delP, put } from '@/utils/http'

// 条件查询呈批件文件信息
export const searchAll = p => get('/api/cpj/conditionPageQueryCpt', p)

// 查询单条呈批件文件信息
export const searchOne = p => get('/api/cpj/queryCptOne', p)

// 添加Api
export const Add = p => post('/api/cpj/insertCpj', p)

// 修改Api
export const ModifyApi = (id, p) => put(`/api/cpj/updateCpt?id=${id}`, p)

// 删除Api
export const Del = p => delP('/api/cpj/falseDeleteCptOne', p)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')

// 审核Api
export const Audit = p => get('/api/cpj/officialCpj', p)
