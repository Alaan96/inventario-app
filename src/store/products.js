import IDB from '@/idb'

const state = () => ({
  list: []
})

const mutations = {
  async load_products(state, products) {
    state.list = products
  },
  async add_product(state, product) {
    if (product) state.list.push(product)
  },
  async remove_product(state, id) {
    if (!id) return
    const index = state.list.findIndex(product => product.id === id)
    state.list.splice(index, 1)
  }
}

const getters = {
}

const actions = {
  async load_products({ commit }) {

    const { result, success } = await IDB.read('products')

    commit('load_products', result)

    return success
  },
  async add_product({ commit }, product) {
    // Guardar producto local
    const { success } = await IDB.add('products', product)

    if (success) commit('add_product', product)

    return success
  },
  async remove_product({ commit }, id) {
    const { success } = await IDB.remove('products', id)

    if (success) commit('remove_product', id)

    return success
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}