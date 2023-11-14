const files = require.context('./', true, /(.js$)/)

const modules = {}
files.keys().forEach(key => {
  if (key !== './index.js') {
    const filename = key.replace(/^\.\/|\.js$/g, '')
    modules[filename] = files(key).default
  }
})
export default modules