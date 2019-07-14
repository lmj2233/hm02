// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 Login 组件
import Login from '@/views/login'
// 导入 home 组件即首页
import home from '@/views/home'
// 导入 welcome 组件
import welcome from '@/views/welcome'
import NotFound from '@/views/404'

// 注册VueRouter
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      // name: 'home',
      component: home,
      children: [
        { path: '/', name: 'welcome', component: welcome }
      ]
    },
    { path: '*', name: 'NotFound', component: NotFound }

  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const user = window.sessionStorage.getItem('hm02')
  // console.log(user)
  // console.log(JSON.parse(window.sessionStorage.getItem('hm02')))
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
