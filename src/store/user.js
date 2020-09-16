import IDB from '@/idb'
import { v4 as uuid } from 'uuid'

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
  user: state => state.user
}

const actions = {
  async register(context, user) {
    // Creando id en local
    user.id = uuid()
    user.sync_code = user.id.slice(-4)

    console.log(user)

    // Guardando usuario en IndexedDB
    const data = await IDB.add('users', user)

    return data.success
  },
  async login(context, user) {
    context.commit('login', user)
    localStorage.setItem('logged-as', user.id)

    return true
  },
  async load_user(context) {
    const logged_as = localStorage.getItem('logged-as')

    if (!logged_as) return

    const response = await IDB.get('users', logged_as)
    if (response.success) context.commit('login', response.result)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}