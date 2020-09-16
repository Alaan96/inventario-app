import IDB from '@/idb'

const state = () => ({
  offline_mode: IDB.enabled() || false
})

const mutations = {
  load_settings(state, data) {
    if (data) state.offline_mode = data.offline_mode
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