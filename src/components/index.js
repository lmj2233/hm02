// 全局插件，将插槽注册为全局插件
import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
