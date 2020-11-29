import { v4 as uuid } from 'uuid'
import axios from '@/axios.js'
import IDB from '@/idb.js'

const offline_storage = IDB.enabled()
let res
let local_res

let response = {
  success: false,
  results: null,
  message: ''
}

export const User = {
  save: async (user) => {
    // Almacenamiento en Backend
    try {
      user.inventories = []
      res = await axios.post('user/create', user)
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }

    // Almacenamiento en local
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