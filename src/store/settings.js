import IDB from '@/idb'

const state = () => ({
  online: IDB.enabled() || false
})

const mutations = {
  load_settings(state, data) {
    if (data) state.online = data.online
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