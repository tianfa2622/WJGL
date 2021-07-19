// eslint-disable-next-line no-unused-vars
import { get, post, delP, put } from '@/utils/http'

// 条件查询活动管理信息
export const searchAll = p => get('/api/hdgl/queryHdgl', p)

// 查询单条活动管理信息
export const searchOne = p => get('/api/hdgl/queryHdglOne', p)

// 添加多条Api
export const AddList = p => post('/api/hdgl/insertHdgl', p)

// 修改Api
export const ModifyApi = (id, p) => put(`/api/hdgl/specificinsertHdgl?id=${id}`, p)

// 删除Api
export const Del = p => delP('/api/hdgl/deleteHdgl', p)

// 按排序获取领导Api
export const getDicGroupBy = () => get('/api/universal/queryDicGroupBy')

// 查询二级目录信息
export const searchTwoDirectory = p => get('/api/hdgl/queryPlace', p)

// // 查询一级目录信息
export const searchOneDirectory = () => get('/api/hdgl/querySite')
