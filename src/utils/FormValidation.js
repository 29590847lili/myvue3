/* eslint-disable */
import axios from 'axios'

// 2.验证金额11位，整数最多8位小数两位
export const checkAmount = (rule, value, callback) => {
  const reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
  if (!value) {
    return callback(new Error('请填写金额'))
  } else if (!reg.test(value)) {
    return callback(new Error('金额不正确'))
  } else {
    callback()
  }
}
// 身份证
export const checkIdNum = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}
// 手机号码
export const validateMobile = (rule, value, callback) => {
  let reg = /^1[0-9]{10}$/
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else if (!reg.test(value)) {
    callback(new Error('手机号码格式输入不正确'))
  } else {
    callback()
  }
}
// 座机号码
export const validateConsultingPhone = (rule, value, callback) => {
  let reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
  if (value === '') {
    callback(new Error('必填项不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('电话格式输入不正确'))
  } else {
    callback()
  }
}
// 验证经度
export const validateJingDu = (rule, value, callback) => {
  const reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,8})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,8}|180)$/
  if (!value) {
      return callback(new Error('请填写经度'))
  } else if (!reg.test(value)) {
      return callback(new Error('经度不正确'))
  } else {
    callback()
  }
}
// 验证纬度
export const validateWeiDu = (rule, value, callback) => {
  const reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,9}|90\.0{0,9}|[0-8]?\d{1}|90)$/
  if (!value) {
    return callback(new Error('请填写纬度'))
  } else if (!reg.test(value)) {
    return callback(new Error('纬度不正确'))
  } else {
    callback()
  }
}
// 纯汉字
const checkFontH = (rule, value, callback) => {
  if (value && !(/^[\u4e00-\u9fa5]+$/.test(value))) {
    callback(new Error('输入格式错误，请重新输入'))
  } else {
    callback()
  }
}
