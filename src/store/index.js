import Vue from 'vue'
import Vuex from 'vuex'

import settings from './settings'
import user from './user'
import inventories from './inventories'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    settings,
    user,
    inventories,
    products,
  }
})
