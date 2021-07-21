import { get, post, delP, put } from '@/utils/http'

// 条件查询用户信息
export const searchAll = p => get('/adminController/getAllAdmins', p)

// 查询单条上级来文信息
export const searchOne = p => get('/api/sjlw/querySjlwOne', p)

// 添加Api
export const Add = p => post('/adminController/insertAdmin', p)

// 重置密码
export const resetPassword = p => post('/adminController/reset', p)

// 修改Api
export const ModifyApi = p => put(`/adminController/updateAdmin`, p)

// 删除Api
export const Del = id => delP(`/adminController/deleteAdmin/${id}`)

// 更改用户状态
export const ChangeStatus = p => put('/adminController/updateState', p)

// 设置用户角色
export const SetRole = p => put('/adminController/addRole', p)
