import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import XLSX from 'xlsx'
import Print from 'vue-print-nb'

Vue.prototype.XLSX = XLSX

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Print)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
