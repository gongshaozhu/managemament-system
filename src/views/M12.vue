<template>
  <div>
    <VueUeditorWrap  v-model="msg"  :config="editorConfig" editor-id="editor-demo-01"/>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'; // ES6 Module
export default {
  name: 'wangEditor',
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      msg: '<h2>Hello World!</h2>',
      editorConfig: {
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
        UEDITOR_HOME_URL: "/UEditor/",
        // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "//ueditor.zhenghaochuan.com/cos",
      },
    }
  },
  methods: {

  },
  mounted() {

  },
  beforeDestroy() {

  }
}

</script>

<style lang="less" scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
