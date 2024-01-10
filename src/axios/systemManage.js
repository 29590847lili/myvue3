// 系统管理
import axios from 'axios'
const Auth = '/api/auth'
const Permission = '/api/permission'
const Process = '/api/process'
const TumorAuth = '/tumor/auth'
const TumorSystem = '/tumor/system'
const Registry = '/api/registry'
/**
 * 账号管理
 */
// 获取账号列表
export const postUserDataPage = params => { return axios.post(`${Registry}/mdm/user/page`, params) }
// 添加账号
export const postUserRegister = params => { return axios.post(`${Registry}/mdm/user/register`, params) }
// 获取用户详情
export const getUserGetDetail = params => { return axios.get(`${Registry}/mdm/user/getDetail/${params}`) }
// 获取登记处树形
export const getListOrgTree = params => { return axios.get(`${Registry}/mdm/organization/treeSub/${params}`) }
// 添加账号同时设置用户角色
export const postSaveUserRole = params => { return axios.post(`${Permission}/user-role/saveUserRole`, params) }
// 编辑账号同时修改角色
export const postUpdateUserRoleByUserId = params => { return axios.post(`${Permission}/user-role/updateUserRoleByUserId`, params) }
// 为账号添加角色
export const postCreateRole = params => { return axios.post(`${Permission}/role/createRole`, params) }
// 修改角色信息
export const postUpdateRoleDetail = params => { return axios.post(`${Permission}/role/updateRoleDetail`, params) }
// 获取角色列表
export const postQueryRoleList = params => { return axios.post(`${Permission}/role/queryRoleList`, params) }
export const postListRoleByOrg = params => { return axios.post(`${Registry}/mdm/user/listRoleByOrg`, params) }
// 修改角色状态
export const postUpdateRoleStatus = params => { return axios.post(`${Permission}/role/updateRoleStatus`, params) }
// 删除角色
export const postRemoveRoleById = params => { return axios.post(`${Permission}/role/removeRoleById`, params) }
// 编辑账号
export const postUserUpdate = params => { return axios.post(`${Registry}/mdm/user/update`, params) }
// 重置密码
export const postPasswordReset = params => { return axios.post(`${Auth}/user/password/reset`, params) }
// 账号状态启用/禁用
export const postAccountUseUpdateStatus = params => { return axios.post(`${Auth}/user/updateStatus`, params) }
// 修改密码
export const postPasswordModify = params => { return axios.post(`${Auth}/user/password/modify`, params) }
// 温馨提示为了您的账号安全，建议您修改密码，如您未修改密码，将无法继续登录
export const isUpdatePassword = params => { return axios.get(`${Auth}/user/isUpdatePassword/${params}`) }
// 根据手机号获取验证码
export const postCaptchaPassword = params => { return axios.post(`${Auth}/captcha/password`, params) }
// 忘记密码
export const postUserPasswordSmsReset = params => { return axios.post(`${Auth}/user/password/sms/reset`, params) }
/**
 * 菜单管理
 */
// 获取全部菜单树
export const getMenuTreeList = params => { return axios.get(`${Permission}/menu/getMenuTreeList`, { params: params }) }
// 新增菜单
export const postaddMenu = params => { return axios.post(`${Permission}/menu/addMenu`, params) }
// 按id查菜单
export const postGetMenuById = params => { return axios.post(`${Permission}/menu/getMenuById/${params.id}`, params) }
// 修改菜单
export const postUpdateMenu = params => { return axios.post(`${Permission}/menu/updateMenu/`, params) }
// 删除菜单
export const postRemoveMenu = params => { return axios.post(`${Permission}/menu/removeMenu/${params.id}`, params) }
// 通过角色id查询角色详情
export const postQueryRoleById = params => { return axios.post(`${Permission}/role/queryRoleById`, params) }

// 获取省级行政区划
export const getAreaListProvince = params => { return axios.get(`${Process}/mdm/area/listProvince`, { params: params, LOAD_ING: true }) }
// 根据省获取市级行政区划
export const getAreaListCityByPid = params => { return axios.get(`${Process}/mdm/area/listCityByPid/${params}`, { LOAD_ING: true }) }
// 根据市获取县级行政区划
export const getAreaListCountyByPid = params => { return axios.get(`${Process}/mdm/area/listCountyByPid/${params}`, { LOAD_ING: true }) }
// 根据县获取镇级行政区划
export const getAreaListTownByPid = params => { return axios.get(`${Process}/mdm/area/listTownByPid/${params}`, { LOAD_ING: true }) }
// 身份校验
export const postUserIsRealData = params => { return axios.post(`${TumorAuth}/source/check`, params) }
export const sourceShow = params => { return axios.post(`${TumorAuth}/source/show`, { params: params }) }
// 是否查看过协议
export const getStatus = params => { return axios.get(`${TumorSystem}/querySwitchByType/1`, { params: params }) }
export const saveSwtich = params => { return axios.post(`${TumorSystem}/saveSwtich`, params) }

// 联动查询城市字典
export const getAreaByCode = params => { return axios.post(`${Registry}/mdm/area/getAreaByCode`, params) }

// 获取登记处管理区划
export const getTreeOrgArea = params => { return axios.get(`${Registry}/mdm/organization/treeOrgArea/${params}`) }
