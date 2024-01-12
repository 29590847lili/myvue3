import GlobalMenu from '@/components/globalMenu.vue'
import YcSearchInput from '@/components/yc-assembly/yc-search-input.vue' // 查询条件 文本输入框
import YcSearchSelect from '@/components/yc-assembly/yc-search-select.vue' // 查询条件 下拉选框
// import YcSearchCascader from '@/components/yc-assembly/yc-search-cascader.vue' // 查询条件 级联下拉选框
// import YcSearchDatePicker from '@/components/yc-assembly/yc-search-datePicker.vue' // 查询条件 日期范围选择框
// import YcSearchDatePickerYMD from '@/components/yc-assembly/yc-search-datePickerYMD.vue' // 查询条件 日期范围选择框
// import YcSearchTree from '@/components/yc-assembly/yc-search-tree.vue' // 查询条件 筛查机构
// import YcButton from '@/components/yc-assembly/yc-button.vue' // 自定义按钮
// import YcEditor from '@/components/yc-assembly/yc-editor.vue' // 富文本编辑器
// import YcUploadImg from '@/components/yc-assembly/yc-uploadImg.vue' // 图片上传组件
// import YcUploadVideo from '@/components/yc-assembly/yc-uploadVideo.vue' // 视频上传组件
import CrumbsMenu from '@/components/crumbsMenu.vue' // 面包屑导航
// import Tabs from '@/components/tabs.vue' // 选项卡
// import GlobalAddress from '@/components/globalAddress.vue' // 四级地区联动
// import UploadHeader from '@/components/uploadHeader.vue' // 上传头像
import GlobalFootButtons from '@/components/globalFootButtons.vue' // 全局底部按钮
import Title from '@/components/title.vue' // 全局标题
import Butns from '@/components/butns.vue' // 全局底部按钮

const registerComponents = (app) => {
  app.component('GlobalMenu', GlobalMenu)
  app.component('YcSearchInput', YcSearchInput)
  app.component('YcSearchSelect', YcSearchSelect)
  // app.component('YcSearchCascader', YcSearchCascader)
  // app.component('YcSearchDatePicker', YcSearchDatePicker)
  // app.component('YcSearchDatePickerYMD', YcSearchDatePickerYMD)
  // app.component('YcSearchTree', YcSearchTree)
  // app.component('YcButton', YcButton)
  // app.component('YcEditor', YcEditor)
  // app.component('YcUploadImg', YcUploadImg)
  // app.component('YcUploadVideo', YcUploadVideo)
  app.component('CrumbsMenu', CrumbsMenu)
  // app.component('Tabs', Tabs)
  // app.component('GlobalAddress', GlobalAddress)
  // app.component('UploadHeader', UploadHeader)
  app.component('GlobalFootButtons', GlobalFootButtons)
  app.component('Title', Title)
  app.component('Butns', Butns)
}

export default registerComponents