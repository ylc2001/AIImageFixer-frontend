import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import ImagePreview from 'vue-img-viewer'
import 'element-ui/lib/theme-chalk/index.css'
import '../css/index.css';
import router from './router'
// 引入Axios
import axios from 'axios'
axios.defaults.withCredentials='true'; //让ajax携带cookie
Vue.prototype.$http=axios

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



export const backend_url = "https://aiimagefixer-backend-bugmakers.app.secoder.net"
export const frontend_url = "https://aiimagefixer-frontend-bugmakers.app.secoder.net"
// export const backend_url = "http://localhost:8000"
// export const frontend_url = "localhost:8080"
axios.defaults.baseURL = backend_url //初始化基础地址

Vue.use(ElementUI)
Vue.use(ImagePreview)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
