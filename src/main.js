import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { loadState } from './utils/state'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

loadState(['user', 'settings'],
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
)