import IDB from '@/idb.js'
import { User } from '@/api.js'

const state = () => ({
  user: null,
})

const mutations = {
  login(state, data) {
    if (data) {
      state.user = {
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        sync_code: data.sync_code
      }
    }
  }
}

const getters = {
  user: state => state.user
}

const actions = {
  async register(context, user) {
    return await User.save(user)
  },
  async login({ commit }, user) {
    commit('login', user)
    if (!localStorage.getItem('logged-as')) localStorage.setItem('logged-as', user.id)

    return true
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}