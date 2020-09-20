const db_name = 'inventario-dev'

let response = {
  success: false,
  message: '',
  result: null
}

const enabled = () => {
  if (!window.indexedDB) return false
  
  return true
}

const connect = (store = null) => {
    return new Promise((resolve, reject) => {
    const request = indexedDB.open(db_name)

    request.onerror = event => {
      console.log('IDB: Error al conectar a IndexedDB.')
      reject(event)
    }

    request.onsuccess = event => {
      console.log('IDB: Conectado a IndexedDB.')
      resolve(event.target.result)
    }

    request.onupgradeneeded = event => {
      console.log('IDB: Actualizando IndexedDB.')
      const db = event.target.result
      db.createObjectStore('users', { keyPath: 'id' })
      db.createObjectStore('inventories', { keyPath: 'id' })
    }
  })
}

const add = async(store, item) => {
  const db = await connect()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, 'readwrite')
    transaction.objectStore(store).add(item)

    transaction.onerror = event => {
      // console.log('IDB: Error en transacción')
      response.message = event.target.error.message
      response.result = item
      reject(response)
    }

    transaction.oncomplete = () => {
      // console.log('IDB: Transacción completada')
      response.success = true
      response.message = 'Transacción completada.'
      response.result = item
      resolve(response)
    }
  })
}

const get = async(store, key) => {
  const db = await connect()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, 'readonly')
    const request = transaction.objectStore(store).get(key)

    request.onerror = () => {
      response.message = 'No se ha podido obtener el registro.'
      reject(response)
    }
    request.onsuccess = () => {
      response.success = true
      response.message = 'Registro obtenido con éxito.'
      response.result = request.result
      resolve(response)
    }
  })
}

const read = async(store) => {
  const db = await connect()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, 'readonly')
    const object_store = transaction.objectStore(store)
    let results = []

    object_store.openCursor().onsuccess = event => {
      const cursor = event.target.result

      if (cursor) {
        results.push(cursor.value)
        cursor.continue()
      } else {
        // console.log('No hay más registros.')
      }
    }

    transaction.onerror = () => {
      response.message = 'Error al leer los registros.'
      reject(response)
    }

    transaction.oncomplete = () => {
      response.success = true
      response.message = 'Registros leídos con éxito.'
      response.result = results
      resolve(response)
    }
  })
}

const find = async (store, conditions = null) => {
  const db = await connect()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, 'readonly')
    const object_store = transaction.objectStore(store)
    let results = []

    object_store.openCursor().onsuccess = event => {
      const cursor = event.target.result
      let add = false
      
      if (cursor) {
        const value = cursor.value

        Object.keys(conditions).forEach( key => {
          if (value[key] instanceof Array) {
            add = value[key].includes(conditions[key])
            return
          }

          add = value[key] == conditions[key]
        })

        if (add) results.push(value)
        cursor.continue()
      } else {
        // console.log('No hay más registros.')
      }
    }

    transaction.onerror = () => {
      response.message = 'Error al leer los registros.'
      reject(response)
    }

    transaction.oncomplete = () => {
      response.success = true
      response.message = 'Registros leídos con éxito.'
      response.result = results
      resolve(response)
    }
  })
}

const edit = async(store, key, edits) => {
  const db = await connect()

  return new Promise((resolve, reject) => {
    const object_store = db.transaction(store, 'readwrite').objectStore(store)
    const request = object_store.get(key)

    request.onerror = event => {
      response.message = event.target.error.message
      response.result = null
      reject(response)
    }

    request.onsuccess = () => {
      let item = request.result

      Object.keys(edits).forEach( key => {
        if (item[key] instanceof Array) {
          item[key].push(edits[key])
          return
        }
        item[key] = edits[key]
      })

      const update = object_store.put(item)

      update.onerror = event => {
        response.message = event.target.error.message
        response.result = item
        reject(response)
      }

      update.onsuccess = () => {
        response.success = true
        response.message = 'Edición completa.'
        response.result = item
        resolve(response)
      }
    }
  })
}

export default {
  enabled,
  connect,
  add,
  get,
  read,
  find,
  edit
}