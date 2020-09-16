import IDB from '@/idb'

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
    // Guardando usuario en IndexedDB
    const data = await IDB.add('users', user)

    return data.success
  },
  async login(context, user) {
    context.commit('login', user)
    localStorage.setItem('logged-as', user.id)

    return true
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}