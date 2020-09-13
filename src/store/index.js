import Vue from 'vue'
import Vuex from 'vuex'

import settings from './settings'
import user from './user'

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
    user
  }
})
