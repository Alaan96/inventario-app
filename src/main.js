import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

const loadState = async(states, initVue) => {
  if (states && initVue) {

    // Cargar datos de usuario
    if (states.includes('user')) await store.dispatch('load_user')
    
    initVue
  }
}

loadState(['user'],
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
)