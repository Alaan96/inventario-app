const db_name = 'inventario-dev'

let response = {
  success: false,
  message: '',
  result: null
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

const read = async(store, items) => {
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
        console.log('No hay más registros.')
      }
    }

    transaction.onerror = () => {
      response.message = 'Error al leer los registros.'
      reject(response)
    }

    transaction.oncomplete = () => {
      response.success = true
      response.message = 'Registros leídos con éxito.'
      response.results = results
      resolve(response)
    }
  })
}

export default {
  connect,
  add,
  get,
  read
}