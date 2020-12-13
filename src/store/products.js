import IDB from '@/idb'
import { Product } from '@/api.js'

const state = () => ({
  list: {}
})

const mutations = {
  add_product(state, product) {
    if (product) {
      if(!state.list.hasOwnProperty(product.inventory)) state.list[product.inventory] = []
      state.list[product.inventory].push(product)
    }
  },
  load_products(state, products) {
    if (products) {
      products.forEach(product => {
        if (!state.list.hasOwnProperty(product.inventory)) state.list[product.inventory] = []
        state.list[product.inventory].push(product)
      })
    }
  },
  edit_product(state, product_edited) {
    if (product_edited) {
      const index = state.list[product_edited.inventory]
                    .findIndex(product => product.id === product_edited.id)
      if (index >= 0) {
        state.list[product_edited.inventory][index] = product_edited
      }
    }
  },
  remove_product(state, product_removed) {
    if (product_removed) {
      const index = state.list[product_removed.inventory]
                    .findIndex(product => product.id === product_removed.id)
      state.list[product_removed.inventory].splice(index, 1)
    }
  }
}

// const getters = {
// }

const actions = {
  async add_product({ commit }, product) {
    const res = await Product.add(product)

    if (res.success) commit('add_product', res.result)

    return res
  },
  async load_all_products({ commit }, user_id) {
    const res = await Product.load_all(user_id)

    if (res.success) commit('load_products', res.result)

    return res
  },
  async get_product(context, product_id) {
     return await Product.get(product_id)
  },
  async edit_product({ commit }, edits) {
    const res = await Product.edit(edits)

    if (res.success) commit('edit_product', res.result)

    return res
  },
  async remove_product({ commit }, product) {
    const res = await Product.remove(product)

    if (res.success) commit('remove_product', product)

    return res
  },
}

export default {
  state,
  mutations,
  // getters,
  actions
}