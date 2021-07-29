// eslint-disable-next-line no-unused-vars
import { get, put, post, delP } from '@/utils/http'

// 条件查询所有字典信息
export const searchAll = p => get('/dictionaryController/getAllDic', p)

// 查询单个组织信息
export const searchOne = p => get('/dictionaryController/queryOneDic', p)

// 新增字典Api
export const AddList = p => post('/dictionaryController/insertDic', p)

// 修改字典Api
export const ModifyApi = p => put('/dictionaryController/updateDic', p)

// 更改字典状态Api
export const DisableApi = p => put('/dictionaryController/updateDicState', p)

// 按照排序获取领导姓名
export const searchLdName = () => get('/dictionaryController/queryDicGroupBy')

// 删除Api
export const Del = id => delP(`/dictionaryController/deleteDic/${id}`)
