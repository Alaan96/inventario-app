import store from '../store'
import IDB from '@/idb'

export const loadState = async (states, initVue) => {
  if (states && initVue) {
    const logged_as = localStorage.getItem('logged-as')

    if (!logged_as) {
      initVue
      return
    }

    // Obtener usuario en local
    const response = await IDB.get('users', logged_as)

    if (!response.success) {
      initVue
      return
    }

    const user = response.result
    const id = user.id

    // Cargar datos de usuario
    if (states.includes('user')) {
      store.commit('login', user)
    }

    // Cargar configuraciones
    if (states.includes('settings')) {
      store.commit('load_settings', user)
    }

    // Cargar inventarios
    if (states.includes('inventories')) {
      const res = await IDB.read('inventories')
      const inventories = res.result.filter( inventory => inventory.members.includes(id))

      if (!res.success || inventories.length === 0) {
        initVue
        return
      }

      store.commit('load_inventories', inventories)
    }

    initVue
  }
}