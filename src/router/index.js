// 配置路由
import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入 Login 组件
import Login from '@/views/login'
// 导入 home 组件即首页
import Home from '@/views/home'
// 导入 welcome 组件
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'

// 注册VueRouter
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: NotFound }
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
