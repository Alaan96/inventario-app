import IDB from '@/idb'

const state = () => ({
  offline: false
})

const mutations = {
  load_settings(state, data) {
    if (data) state.offline = data.offline
  }
}

const getters = {
}

const actions = {
}

export default {
  state,
  mutations,
  getters,
  actions
}