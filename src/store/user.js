import axios from '@/axios.js'
import IDB from '@/idb.js'
import { v4 as uuid } from 'uuid'

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
  },
  async add_inventory({ state }, inventory_id) {
    const { result } = await IDB.get('users', state.user.id)
    let user = result

    user.inventories.push(inventory_id)

    // Guardar id del inventario en el usuario
    const { success } = await IDB.edit('users', state.user.id, user)

    return success
  },
  async leave_inventory({ state }, inventory_id) {
    const { result } = await IDB.get('users', state.user.id)
    let user = result

    const index = user.inventories.findIndex(inventory => inventory === inventory_id)
    user.inventories.splice(index, 1)
    
    // // Eliminar id en Array de inventarios
    const { success } = await IDB.edit('users', state.user.id, user)

    return success
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}