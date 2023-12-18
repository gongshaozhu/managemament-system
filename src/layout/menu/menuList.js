export default [
  {
    value: 'OrderManage',
    label: '订单管理',
    icon: 'el-icon-folder-opened',
    children: [
      /*{
        value: 'multiFormCheck',
        label: '多表单校验',
        children: [
      },*/
      {
        value: 'SaleGoods',
        label: '可售商品',
        path: '/sale-goods',
        componentName: 'SaleGoods',
        icon: 'el-icon-s-goods',
        defaultActive: true,
      },
      {
        value: 'MyOrder',
        label: '我的订单',
        path: '/my-order',
        componentName: 'MyOrder',
        icon: 'el-icon-s-order'
      },
      {
        value: 'loopForm',
        label: '循环表单1',
        path: '/home2',
      },
    ]
  },
  {
    value: 'secondaryPackageCom',
    label: '封装组件',
    path: '/home3'
  }
]