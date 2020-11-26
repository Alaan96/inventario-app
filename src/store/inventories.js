import IDB from '@/idb'

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
        state.list[`${inventory.id}`] = inventory
      })
    }
  },
  edit_inventory(state, editedInventory) {
    if (editedInventory) {
      state.inventories[editedInventory.id] = editedInventory
    }
  },
  empty_inventories(state) {
    state.list = {}
  },
  remove_inventory(state, id) {
    delete state.list[id]
  },
}

const getters = {
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
  },
  async edit_inventory({ commit }, inventory) {
    // Editar inventario en local
    const { success } = await IDB.edit('inventories', inventory.id, inventory)

    if (success) commit('edit_inventory', inventory)

    return success
  },
  async leave({ commit }, id) {
    // Borrar el inventario en local
    const { success } = await IDB.remove('inventories', id)

    if (success) commit('remove_inventory', id)

    return success
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}