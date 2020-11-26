import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import loadState from './utils/state'
import './utils/filters'

Vue.config.productionTip = false

loadState(['user', 'settings', 'inventories', 'products'],
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
)