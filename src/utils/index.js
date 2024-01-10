// import Vue from 'vue'
// const vm = new Vue()
import { createApp } from 'vue'
import App from '@/App.vue'
const vm = createApp(App)
// 登录时调用 存储登录时间
export const loginTime = () => {
  const newDate = new Date()
  localStorage.setItem('loginTime', newDate.getTime())
}
// 判断登录时间是否需要重新获取token
export const compareTime = () => {
  var nowD = new Date() // 当前时间
  const endD = parseInt(localStorage.getItem('loginTime')) // 有效开始时间
  const time = nowD.getTime() - endD
  if (time > 5400000) { // 5400000
    if (time < (1000 * 60 * 60 * 2)) return 1 // 两小时有效 1000*60*60*2 7200000
    else if (time > (1000 * 60 * 60 * 2)) return 2 // 两小时有效 1000*60*60*2 7200000
  } else return 3 // 不处理
}

// 导出Excel、zip压缩文件
export const exportExcel = (res, name, loadtype) => {
  let blob = null
  if (loadtype !== '' && loadtype === 'zip') { // zip
    blob = new Blob([res], { type: 'application/zip' })
    const objectURL = URL.createObjectURL(blob)
    const downEle = document.createElement('a')
    downEle.href = objectURL
    downEle.setAttribute('download', `${name}.zip`)
    document.body.appendChild(downEle)
    downEle.click()
  } else { // Excel
    blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    const objectURL = URL.createObjectURL(blob)
    const downEle = document.createElement('a')
    downEle.href = objectURL
    downEle.setAttribute('download', `${name}.xlsx`)
    document.body.appendChild(downEle)
    downEle.click()
    // blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    // const url = window.URL.createObjectURL(blob)
    // const link = document.createElement('a') // 创建a标签
    // link.href = url
    // link.download = name// 重命名文件
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }
}
export const popUp = () => {
  vm.$alert('导出申请已提交，请到"报表下载"菜单中下载数据', '提示', {
    confirmButtonText: '确定',
    callback: action => { }
  })
}

/**
 * @description 静态资源文件下载
 * @param {String} href 必填项 文件地址
 * @param {String} filename 文件名
 * @param {String} fileType 文件类型
 */
export const staticFileDownload = (href, filename = '文件下载', fileType = 'xlsx') => {
  if (!href) {
    vm.$message.error('未发现文件，请检查')
    return
  }
  var a = document.createElement('a') // 创建一个a标签
  a.href = href // 给a标签的href属性值加上地址，如果是项目本地文件，写绝对路径 例如：/static/模板.xlsx
  a.target = '_self' // 在当前页面打开
  a.download = `${filename}.${fileType}` // 设置下载文件的文件名，这里加上.xlsx指定文件类型，pdf文件就指定.pdf即可
  a.style.display = 'none' // 隐藏a标签
  document.body.appendChild(a) // 将a标签追加到文档对象中
  a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove() // 一次性的，用完就删除a标签
}

// 防抖
export function debounce (func) {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, 500)
  }
}
