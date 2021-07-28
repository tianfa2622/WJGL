// eslint-disable-next-line no-unused-vars
import { get, put } from '@/utils/http'

// 条件查询组织信息
export const searchAll = p => get('/OrganizationController/selectAllDicOrganization', p)

// 查询单个组织信息
export const searchOne = p => get('/OrganizationController/selectOneDicOrganization', p)

// 添加组织信息Api
export const AddList = p => put('/OrganizationController/insertDicOrganization', p)

// 修改组织信息Api
export const ModifyApi = p => put('/OrganizationController/updateDicOrganization', p)

// 禁用组织信息Api
export const DisableApi = p => put('/OrganizationController/forbiddenDicOrganization', p)

// 根据账号级别查询账号范围
export const searchScope = p => get('/OrganizationController/selectDanwei', p)

// 根绝机构名称获取机构代码
export const searchCode = p => get('/OrganizationController/selectSjdm', p)

// 根绝机构类型获取机构名称
export const searchName = p => get('/OrganizationController/selectSjjg', p)
