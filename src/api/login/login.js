// eslint-disable-next-line no-unused-vars
import { get, post } from '@/utils/http'

// 获取当前登录用户信息
export const searchLogin = p => get('/loginController/admin/info', p)

// 登录Api
export const Login = p => post('/loginController/login', p)

// 退出Api
export const LoginOut = () => post('/loginController/logout')
