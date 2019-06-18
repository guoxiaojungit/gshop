import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import '../public/css/reset.css'
import store from './store/store'
require('./mock/mockServer')

Vue.component(Button.name,Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
