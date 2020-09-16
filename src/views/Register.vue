<template>
  <form @keyup="valid_inputs()" @submit.prevent="register(values)">
    <legend>Completá estos datos para ingresar</legend>

    <div class="field">
      <label for="name">Nombre </label>
      <span class="status" :class="{'invalid': !valid.name}">{{status.name}}</span>
      <input type="text"
        id="name"
        name="name"
        autocomplete="off"
        placeholder="Tu nombre"
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$"
        spellcheck="false"
        v-model="values.name">
    </div>
    <div class="field">
      <label for="lastname">Apellido </label>
      <span class="status" :class="{'invalid': !valid.lastname}">{{status.lastname}}</span>
      <input type="text"
        id="lastname"
        name="lastname"
        autocomplete="off"
        placeholder="Tu apellido"
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$"
        spellcheck="false"
        v-model="values.lastname">
    </div>

    <btn :disabled="!valid_form">
      Ingresar
    </btn>

    <router-link to="/login" class="go-to">Ya tengo cuenta</router-link>
  </form>
</template>

<script>
  import btn from '@/components/btn.vue'
  
  import IDB from '@/idb'
  import { v4 as uuid } from 'uuid'

  export default {
    components: {
      btn
    },
    data() {
      return {
        values: {
          name: '',
          lastname: ''
        },
        valid: {
          name: false,
          lastname: false
        },
        status: {
          name: '',
          lastname: ''
        }
      }
    },
    computed: {
      valid_form() {
        if (this.valid.name && this.valid.lastname) {
          return true
        }
        return false
      }
    },
    mounted() {
    },
    methods: {
      valid_inputs() {
        const target = event.target
        if (target.tagName === 'INPUT') {
          const name = target.name
          const pattern = new RegExp(target.pattern)
          const value = target.value
          const valid = pattern.test(value)

          if (target.value.length >= 2 && valid) {
            this.valid[name] = true
            this.status[name] = 'válido'
          } else if (target.value.length >= 2 && !valid) {
            this.valid[name] = false
            this.status[name] = 'inválido'
          } else if (target.value.length === 0) {
            this.valid[name] = false
            this.status[name] = ''
          }
        } 
      },
      async register(user) {
        console.log('Enviando formulario...')

        // Crear usuario
        user.id = uuid()
        user.sync_code = user.id.slice(-4)
        user.inventories = []
        user.offline_mode = IDB.enabled() || false

        const registered = await this.$store.dispatch('register', user)

        if (registered) this.$router.push('/login')
      }
    }
  }
</script>