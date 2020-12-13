import IDB from '@/idb'
import { Inventory } from '@/api.js'

const state = () => ({
  list: {},
})

const mutations = {
  add_inventory(state, inventory) {
    if (inventory) state.list[inventory.id] = inventory
  },
  load_inventories(state, inventories) {
    if (inventories) {
      inventories.forEach(inventory => {
        state.list[inventory.id] = inventory
      })
    }
  },
  edit_inventory(state, editedInventory) {
    if (editedInventory) {
      state.list[editedInventory.id] = editedInventory
    }
  },
  empty_inventories(state) {
    state.list = {}
  },
  remove_inventory(state, id) {
    delete state.list[id]
  }
}

const getters = {
  inventories_quantity: (state) => Object.values(state.list).length,
  inventories_id: (state) => Object.keys(state.list)
}

const actions = {
  async create_inventory({ rootState, commit }, inventory) {
    const res = await Inventory.create(inventory, rootState.user.user.id)

    if (res.success) commit('add_inventory', res.result)

    return res
  },
  async load_inventories({ commit }, id) {
    const res = await Inventory.load(id)

    commit('load_inventories', res.result)

    return res.success
  },
  async edit_inventory({ commit }, inventory) {
    const res = await Inventory.edit(inventory)

    if (res.success) commit('edit_inventory', inventory)

    return res.success
  },
  async leave({ rootState, commit }, id) {
    const { success } = await Inventory.leave(id, rootState.user.user.id)

    if (success) commit('remove_inventory', id)

    return success
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}