import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'
import './filters'
import '../public/css/reset.css'
import store from './store/store'
import loading from './common/imgs/loading.gif'
require('./mock/mockServer')

Vue.component(Button.name,Button)
Vue.use(VueLazyload, {
  loading
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
