import IDB from '@/idb'

const state = () => ({
  inventories: []
})

const mutations = {
  add_inventory(state, inventory) {
    if (inventory) state.inventories.push(inventory)
  },
  load_inventories(state, inventories) {
    if (inventories) state.inventories = inventories
  },
  empty_inventories(state) {
    state.inventories = []
  }
}

const getters = {
  inventories: (state) => state.inventories
}

const actions = {
  async create_inventory(context, inventory) {
    // Guardar inventario en local
    const data = await IDB.add('inventories', inventory)

    // Agrega a la list inventarios en caso de éxito
    if (data.success) context.commit('add_inventory', inventory)

    return data.success
  },
  async load_inventories({ commit }, id) {
    const conditions = {
      members: id
    }

    const res = await IDB.find('inventories', conditions)
    const inventories = res.result

    commit('load_inventories', inventories)

    return res.success
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}