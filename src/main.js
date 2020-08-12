import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './mock/'
import axios from  'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$http=axios.create({
  baseURL:'http://localhost:9527/admin'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
