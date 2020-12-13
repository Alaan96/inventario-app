import { v4 as uuid } from 'uuid'
import axios from '@/axios.js'
import IDB from '@/idb.js'
import store from '@/store'

const offline_storage = IDB.enabled()
const offline = () => store.state.settings.offline
let res
let local_res

let response = {
  success: false,
  results: null,
  message: ''
}

export const User = {
  save: async (user) => {
    try {
      res = await axios.post('user/create', user)
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }

    try {
      if (!res) user.id = uuid()
      local_res = await IDB.add('users', res ? res.data.results : user)
    }
    catch (err) {
      console.log(err)
    }

    response = res ? res : local_res
    response.message = 'Usuario registrado con éxito.'
    console.log(response)
    
    return response
  }
}

export const Inventory = {
  create: async (inventory, user_id) => {
    inventory.members = [user_id]

    if (!offline()) {
      try {
        res = await axios.post(`inventory/create/${user_id}`, inventory)
      }
      catch(err) {
        console.log(err)
      }
    } else {
      try {
        inventory.id = uuid()
        local_res = await IDB.add('inventories', inventory)
      }
      catch (err) {
        console.log(err)
      }
    }

    response = res ? res : local_res
    response.message = 'Inventario creado con éxito.'
    console.log(response)

    return response
  },
  load: async (user_id) => {
    if (!offline()) {
      try {
        res = await axios.get(`inventory/user/${user_id}`)
      }
      catch(err) {
        console.log(err)
      }
    } else {
      try {
        local_res = await IDB.find('inventories', { members: user_id })
      }
      catch(err) {
        console.log(err)
      }
    }
    response = res || local_res
    response.message = 'Inventarios obtenidos con éxito.'
    console.log(response)

    return response
  },
  edit: async (inventory) => {
    if (!offline()) {
      try {
        res = await axios.put(`inventory/edit/${inventory.id}`, inventory)
      }
      catch(err) {
        console.log(err)
      }
    } else {
      try {
        local_res = await IDB.edit('inventories', inventory.id, inventory)
      }
      catch(err) {
        console.log(err)
      }
    }

    response = res ? res : local_res
    response.message = 'Inventario editado con éxito.'
    console.log(response)

    return response
  },
  leave: async (id, user_id) => {
    if (!offline()) {
      try {
        res = await axios.delete(`inventory/leave/${user_id}`)
      }
      catch(err) {
        console.log(err)
      }
    } else {
      try {
        local_res = await IDB.remove('inventories', id)
      }
      catch(err) {
        console.log(err)
      }

      response = res ? res : local_res
      response.message = 'Inventario eliminado con éxito.'
      console.log(response)

      return response
    }
  }
}

export const Product = {
  add: async (product) => {
    if (!offline()) {
      try {
        res = await axios.post(`product/add/${user_id}`, product)
      }
      catch (err) {
        console.log(err)
      }
    } else {
      try {
        product.id = uuid()
        local_res = await IDB.add('products', product)
      }
      catch (err) {
        console.log(err)
      }
    }

    response = res || local_res
    response.message = 'Producto agregado con éxito.'
    console.log(response)

    return response
  },
  load_all: async (user_id) => {
    if (!offline()) {
      try {
        res = await axios.get(`product/user/${user_id}`)
      }
      catch (err) {
        console.log(err)
      }
    } else {
      try {
        let inventories_id = {}
        store.getters.inventories_id.forEach(id => inventories_id.inventory = id)

        local_res = await IDB.find('products', inventories_id)
      }
      catch (err) {
        console.log(err)
      }
    }
    response = res || local_res
    response.message = 'Productos obtenidos con éxito.'
    console.log(response)

    return response
  },
  get: async (product_id) => {
    try {
      if (!offline()) {
        res = await this.axios.get(`product/${product_id}`)
      } else {
        local_res = await IDB.get('products', product_id)
      }
    }
    catch(err) {
      console.log(err)
    }

    response = res || local_res
    response.message = 'Producto obtenido con éxito.'
    console.log(response)

    return response
  },
  edit: async (edits) => {
    try {
      if (!offline()) {
        res = await axios.put(`product/${edits.id}`, edits)
      } else {
        local_res = await IDB.edit('products', edits.id, edits)
      }
    }
    catch(err) {
      console.log(err)
    }

    response = res || local_res
    response.message = 'Producto editado con éxito.'
    console.log(response)

    return response
  },
  remove: async (product) => {
    try {
      if (!offline()) {
        res = await this.axios.delete(`product/${product.id}`)
      } else {
        local_res = await IDB.remove('products', product.id)
      }
    }
    catch (err) {
      console.log(err)
    }

    response = res || local_res
    response.message = 'Producto eliminado con éxito.'
    console.log(response)

    return response
  }
}