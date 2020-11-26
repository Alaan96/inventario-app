<template>
  <form class="session"
    @submit.prevent>
    <fieldset>
      <legend>Ingresá a tu cuenta con tus datos</legend>
      <field id="login-name"
        name="name"
        placeholder="Tu nombre"
        required
        autofocus
        v-model="form.name">
        Nombre
      </field>
      <field-code id="login-code"
        name="code"
        :chars="4"
        required
        v-model="form.code">
        Código
      </field-code>
      <btn type="submit"
        :disabled="!ready"
        @click.native="login(form, 'normal')">
        Ingresar
      </btn>
    </fieldset>
    <section class="users">
      <card v-for="user in users"
        :key="user.id"
        to="/inventories"
        prevent
        @click.native="login(user, 'fast')">
        <template v-slot:title>
          {{`${user.name} ${user.lastname}`}}
        </template>
        <template v-slot:left>
          <span>{{user.inventories.length | format_plural('inventario') }}</span>
        </template>
      </card>
    </section>

    <router-link to="/register" class="go-to">No tengo cuenta</router-link>
  </form>
</template>

<script>
  import field from '@/components/inputs/field.vue'
  import fieldCode from '@/components/inputs/field-code.vue'
  import btn from '@/components/btn.vue'
  import card from '@/components/card.vue'

  import formValidation from '@/mixins/form-validation.js'
  import IDB from '@/idb.js'
  import axios from '@/axios.js'

  export default {
    components: {
      field,
      fieldCode,
      btn,
      card
    },
    data() {
      return {
        form: {
          name: '',
          code: ''
        },
        users: []
      }
    },
    beforeMount() {
      this.get_users()
    },
    mixins: [formValidation],
    methods: {
      async get_users() {
        const response = await IDB.read('users')
        if (response.success) this.users = response.result
      },
      async login(data, method) {
        if (!data) return
        let logged = false

        if (method === 'fast') {
          logged = await this.$store.dispatch('login', data)
          const load_inventories = await this.$store.dispatch('load_inventories', data.id) 
        } else if (method === 'normal') {
          try {
            const user = await axios.post('/login', data)
            console.log(user)
          }
          catch(err) {
            console.log(err)
          }
        }

        console.log('Iniciando sesión...')
        if (logged) this.$router.push('/inventories')
      }
    },
    filters: {
      format_inventories(amount) {
        if (amount === 1) return `${amount} inventario`
        return `${amount} inventarios`
      }
    }
  }
</script>

<style lang="scss">
  section.users {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>