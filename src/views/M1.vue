<template>
  <div>
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: 'wangEditor',
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {
        excludeKeys: [
          'group-video',
          'uploadVideo',
          'insertVideo',
        ]
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: 'http://localhost:3000/cats/upload',
            maxFileSize: 1 * 1024 * 10241,
            // base64LimitSize: 5 * 10243333,
            fieldName: 'file',
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
            metaWithUrl: false,
            withCredentials: true,
            timeout: 5 * 1000, // 5 秒
          },
        }
      },
      mode: 'default', // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      console.log(this.editor.getConfig())

      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
/*
export default {
  name: 'M1F',
  data() {
    return {
      list: [],
    }
  },
  async mounted () {
    const a = await this.$api.a.getHome()
    console.log('mock-demo', a)
    const b = await this.$api.a.getHomePost()
    this.list = b.data.post.list
    console.log('mock-demo', b.data.post.list)
  },
  methods: {
  }
}*/
</script>

<style lang="less" scoped>
@import "@wangeditor/editor/dist/css/style.css";
img {
  width: 100px;
  height: 100px;
}
</style>
