import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
import { ElNotification, ElMessage } from 'element-plus'
import { loginTime, compareTime } from '@/utils/index'
import { postTokenRefresh } from '@/axios/users'

let responseStep = 0
axios.defaults.withCredentials = true
axios.defaults.timeout = 0
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.preventProjectId = 20
axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
  const sendUuid = localStorage.getItem('sendUuid') ? localStorage.getItem('sendUuid') : ''
  config.headers.sendUuid = sendUuid
  const sendCaptcha = localStorage.getItem('sendCaptcha') ? localStorage.getItem('sendCaptcha') : ''
  config.headers.sendCaptcha = sendCaptcha
  const expTime = compareTime()
  if (expTime === 2) {
    loginTime()
    postTokenRefreshData()
  }
  if (!config.LOAD_ING) addLoading()
  return config
}, function (error) {
  isCloseLoading()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    const DATA = response.data
    const code = DATA.code
    const status = DATA.status
    if (status === 50003) {
      sessionStorage.setItem('timeout', 1)
      router.push('/')
      isCloseLoading()
      return false
    }
    if (response.config.responseType === 'blob' || `${response.headers['content-type']}`.toLowerCase() === 'application/vnd.ms-excel;charset=utf-8' || `${response.headers['content-type']}`.toLowerCase() === 'application/zip;charset=utf-8' || `${response.headers['content-type']}`.toLowerCase() === 'text/html;charset=UTF-8') {
      isCloseLoading()
      return DATA
    }
    if (code === 200 || status === 'SUCCESS') {
      isCloseLoading()
      return DATA
    } else {
      isCloseLoading()
      ElMessage.error(DATA.msg || DATA.ElMessage)
      return DATA
    }
  }
}, function (error) {
  isCloseLoading()
  if (error.response.status === 401) {
    sessionStorage.setItem('timeout', 1)
    router.push('/')
    return false
  }
  if (error && error.response) {
    const response = error.response
    ElNotification({
      type: 'error',
      title: '警告',
      message: `网络链接超时，请稍后重试：（status ${response.status}）`
    })
  } else if (error && error.config) {
    ElNotification({
      type: 'error',
      title: '警告',
      message: '网络链接超时，请稍后重试'
    })
  }
  return Promise.reject(error)
})

const postTokenRefreshData = async () => {
  const params = { refreshToken: localStorage.getItem('refreshToken') }
  const res = await postTokenRefresh(params)
  if (res.code === 200) {
    localStorage.setItem('Authorization', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
  }
}

const addLoading = () => {
  responseStep++
  store.state.loading = true
}
const isCloseLoading = () => {
  responseStep--
  if (responseStep <= 0) {
    store.state.loading = false
  }
}
