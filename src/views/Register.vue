<template>
  <form class="session"
    @submit.prevent>
    <fieldset>
      <legend>Completá estos datos para registrarte</legend>
      <field id="name"
        name="name"
        placeholder="Tu nombre"
        required
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$"
        v-model="user.name">
        Nombre
      </field>
      <field id="lastname"
        name="lastname"
        placeholder="Tu apellido"
        required
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$"
        v-model="user.lastname">
        Apellido
      </field>
      <btn type="submit"
        :disabled="!ready"
        @click.native="register(user)">
        Registrarse
      </btn>
    </fieldset>

    <router-link to="/login" class="go-to">Ya tengo cuenta</router-link>
  </form>
</template>

<script>
  import field from '@/components/inputs/field.vue'
  import btn from '@/components/btn.vue'
  
  import formValidation from '@/mixins/form-validation.js'
  import IDB from '@/idb.js'
  import { v4 as uuid } from 'uuid'

  export default {
    components: {
      field,
      btn
    },
    data() {
      return {
        user: {
          name: '',
          lastname: ''
        },
      }
    },
    mixins: [formValidation],
    methods: {
      async register(user) {
        if (!this.ready) return
        console.log('Enviando formulario...')

        user.id = uuid()
        user.sync_code = ''
        user.inventories = []
        user.offline_mode = IDB.enabled() || false

        const registered = await this.$store.dispatch('register', user)

        if (registered) this.$router.push('/login')
      }
    }
  }
</script>