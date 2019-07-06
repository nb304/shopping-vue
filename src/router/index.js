import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '系统首页',
      icon: 'shouye'
    }
  }]
},

{
  path: '/product',
  component: Layout,
  redirect: '/product/productInfo',
  name: '商品管理',
  meta: {
    title: '商品管理',
    icon: 'shangpinguanli'
  },
  children: [{
    path: 'productInfo',
    name: '商品信息管理',
    component: () => import('@/views/ProductManage/ProductInfoManage'),
    meta: {
      title: '商品信息管理'
    }
  },
  {
    path: 'productBrand',
    name: '商品品牌管理',
    component: () => import('@/views/ProductManage/ProductBrandManage'),
    meta: {
      title: '商品品牌管理'
    }
  },
  {
    path: 'productClassify',
    name: '商品类目',
    component: () => import('@/views/ProductManage/ProductClassifyManage'),
    meta: {
      title: '商品类目管理'
    }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () => import('@/views/tree/index'),
    meta: {
      title: '商品运费管理'
    }
  }
  ]
},

{
  path: '/dwadwa',
  component: Layout,
  meta: {
    title: '采购管理',
    icon: 'caigou'
  },
  children: [{
    path: 'index',
    name: 'Form',
    component: () => import('@/views/form/index'),
    meta: {
      title: '商品申请采购'
    }
  },
  {
    path: 'index',
    name: 'Form',
    component: () => import('@/views/form/index'),
    meta: {
      title: '添加采购管理'
    }
  }, {
    path: 'index',
    name: 'Form',
    component: () => import('@/views/form/index'),
    meta: {
      title: '采购列表管理'
    }
  }
  ]
},

{
  path: '/inform',
  component: Layout,
  redirect: '/inform/productEvaluateManage',
  name: 'Nested',
  meta: {
    title: '通知管理',
    icon: 'tongzhi'
  },
  children: [{
    path: 'productEvaluateManage',
    component: () => import('@/views/InformManage/productEvaluateManage'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '商品评价管理'
    }
  },
  {
    path: 'userFeedbackManage',
    component: () => import('@/views/InformManage/userFeedbackManage'),
    name: 'Menu1-2-1',
    meta: {
      title: '用户反馈管理'
    }
  },
  {
    path: 'systemInformManage',
    component: () => import('@/views/InformManage/systemInformManage'),
    name: 'Menu1-2-2',
    meta: {
      title: '网站通知管理'
    }
  }
  ]
},

{
  path: '/nested1',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested1',
  meta: {
    title: '店铺管理',
    icon: 'dianpu'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '店铺信息管理'
    }
  },
  {
    path: 'menu1-2-1',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    name: 'Menu1-2-1',
    meta: {
      title: '店铺人员管理'
    }
  },
  {
    path: 'menu1-2-2',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    name: 'Menu1-2-2',
    meta: {
      title: '店铺入驻管理'
    }
  },
  {
    path: 'menu1-2-2',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    name: 'Menu1-2-2',
    meta: {
      title: '店铺分类管理'
    }
  }
  ]
},
{
  path: '/nested2',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested15',
  meta: {
    title: '用户管理',
    icon: 'yonghuguanli'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '成员角色管理'
    }
  },
  {
    path: 'menu1-2-1',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    name: 'Menu1-2-1',
    meta: {
      title: '用户账号列表'
    }
  }
  ]
},
{
  path: '/OrderManage',
  component: Layout,
  redirect: '/OrderManage/OrderList',
  name: 'order',
  meta: {
    title: '订单管理',
    icon: 'dingdan'
  },
  children: [{
    path: '/OrderList',
    component: () => import('@/views/OrderManage/OrderList'), // Parent router-view
    name: 'OrderList',
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/OrderReview',
    component: () => import('@/views/OrderManage/OrderReview'),
    name: 'OrderReview',
    meta: {
      title: '订单审核'
    }
  },
  {
    path: 'menu1-2-1',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    name: 'Menu1-2-1',
    meta: {
      title: '订单操作'
    }
  }
  ]
},
{
  path: '/nested5',
  component: Layout,
  name: 'Nested5',
  meta: {
    title: '库存管理',
    icon: 'kucun'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '库存管理列表'
    }
  }]
},

{
  path: '/nested5',
  component: Layout,
  name: 'Nested78',
  meta: {
    title: '物流管理',
    icon: 'wuliu'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '订单签收详情'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '订单物流列表'
    }
  }]
},
{
  path: '/nested98',
  component: Layout,
  name: 'Nested98',
  meta: {
    title: '统计管理',
    icon: 'tongjiguanli'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '商品统计'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '商品评价统计'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '订单数量统计'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '店铺差评统计'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '商品库存统计'
    }
  }]
},

{
  path: '/nested75',
  component: Layout,
  name: 'Nested75',
  meta: {
    title: '营销管理',
    icon: 'yingxiao'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '优惠券管理'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '推广管理'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '积分管理'
    }
  }]
},
{
  path: '/nested46',
  component: Layout,
  name: 'Nested46',
  meta: {
    title: '网站管理',
    icon: 'wangzhan'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '轮播管理'
    }
  }, {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '单页新闻'
    }
  }]
},

{
  path: '/nested52',
  component: Layout,
  name: 'Nested52',
  meta: {
    title: '客服管理',
    icon: 'kefu'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '在线售后客服'
    }
  }]
},
{
  path: '/nested52',
  component: Layout,
  name: 'Nested52',
  meta: {
    title: '资金管理',
    icon: 'zhijingguanli'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '资金概况'
    }
  },
  {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '订单资金'
    }
  },
  {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '店铺资金'
    }
  }
  ]
},
{
  path: '/nested31',
  component: Layout,
  name: 'Nested31',
  meta: {
    title: '日志管理',
    icon: 'rizhi'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '系统日志管理'
    }
  }]
},
{
  path: '/nested518',
  component: Layout,
  name: 'Nested18',
  meta: {
    title: '系统管理',
    icon: 'xitongguanli'
  },
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '模块设置'
    }
  },
  {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '权限设置'
    }
  }
  ]
},
{
  path: '/nested789',
  component: Layout,
  name: 'Nested789',
  children: [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '模块设置'
    }
  }]
},

// 404 page must be placed at the end !!!
	 {
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
