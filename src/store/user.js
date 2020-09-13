import IDB from '@/idb'

const state = () => ({
  user: null,
})

const mutations = {
  login(state, data) {
    if (data) {
      state.user = data
    }
  }
}

const getters = {
}

const actions = {
  async register(context, user) {
    user.full_name = `${user.name} ${user.lastname}`

    // Creating user in IndexedDB
    const data = await IDB.add('users', user)

    return data.success
  },
  async login(context, user) {
    context.commit('login', user)
    localStorage.setItem('logged-as', user.full_name)

    return true
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}