import axios from 'axios'
const Auth = '/auth'
const Permission = '/permission'

// 登录
export const postLogin = params => { return axios.post(`${Auth}/token/login`, params) }
// 验证码
export const captcha = () => { return axios.get(`${Auth}/captcha/login`, { LOAD_ING: true }) }
// 换区token
export const postTokenChange = params => { return axios.post(`${Auth}/token/change`, params) }
// 根据refreshToken重新获取Authorization
export const postTokenRefresh = params => { return axios.post(`${Auth}/token/refresh`, params) }
// 获取用户信息
export const getUserCurrent = () => { return axios.get(`${Auth}/user/current`) }
// 获取角色菜单 原全民接口
export const getMenuRoleTree = params => { return axios.get(`${Permission}/menu/roleTree/${params}`) }
// 获取角色菜单 样本中心独有菜单接口 当中有角色权限判断
export const getMenuRoleTreeOpen = params => { return axios.get(`${Permission}/menu/roleTree/open/${params}`) }
// 获取当前页面下的权限按钮
export const getMenuUserTree = params => { return axios.get(`${Permission}/menu/userTree/${params}`) }
// 根据用户id 查询用户角色
export const getQueryUserRoleByUserId = params => { return axios.get(`${Permission}/user-role/queryUserRoleByUserId/${params}`) }
// 短信验证码
export const postCaptchaSms = params => { return axios.post(`${Auth}/captcha/sms`, params, { LOAD_ING: true }) }
