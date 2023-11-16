const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const Mock = require('mockjs')
server.use(middlewares)
server.use(jsonServer.bodyParser)

// 定义POST请求的处理程序
server.post('/comments1', (req, res) => {
  // const post = req.body;
  // post.id = Date.now();
  // router.db.get('comments').push(post).write();
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-1000': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+3': 1,
      'region|+1': Mock.Random.region(),
      'image': Mock.Random.image('100*100')
    }]
  })
  res.json({post: data});
});
server.use(router)
server.listen(5200, () => {
  console.log('JSON Server is running')
})