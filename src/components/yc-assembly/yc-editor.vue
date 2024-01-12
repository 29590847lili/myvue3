<template>
  <div>
    <div style="border: 1px solid #ccc;">
      <!-- 工具栏 -->
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <!-- 编辑器 -->
      <Editor :style="editorStyle" v-model="html" @onChange="lisChange($event)" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'YCEditor',
  components: { Editor, Toolbar },
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      default: 500
    }
  },
  data () {
    return {
      editor: null, // 编辑器实例
      html: '', // 富文本内容
      toolbarConfig: {
        // 显示哪些菜单，如何排序、分组
        toolbarKeys: [
          'headerSelect', '|', 'bold', 'underline', 'italic', 'color', 'bgColor', '|', 'fontSize', 'fontFamily', 'lineHeight', '|', 'bulletedList', 'numberedList', 'todo', '|', 'emotion', 'insertLink', 'divider'
        ]
        // excludeKeys: [ ] // 隐藏哪些菜单
      },
      mode: 'simple',
      editorConfig: {
        placeholder: '',
        autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {}
      }
    }
  },
  model: {
    prop: 'value',
    event: 'setValue'
  },
  computed: {
    editorStyle () {
      return { height: `${+this.height}px` }
    }
  },
  watch: {
    value: {
      handler (value) {
        this.html = value
      }
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    lisChange (e) {
      this.html = e.getHtml()
      this.$emit('setValue', this.html)
    }
  },
  mounted () {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = this.value
    }, 1500)
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
