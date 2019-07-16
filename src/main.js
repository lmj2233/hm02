import Vue from 'vue'
import App from './App.vue'

// 导入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入router
import router from '@/router/'

// 导入axios 配置axios, 直接挂载到Vue原型上，这样就可以全局使用了
import axios from '@/api/axios'
// 导入全局插件，即插槽
import components from '@/components'
Vue.use(components)

Vue.prototype.$http = axios

// 注册为全局组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 设置router选项，挂载到根实例
  router,
  render: h => h(App)
}).$mount('#app')
