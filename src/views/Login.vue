<template>
  <form class="session"
    @submit.prevent>
    <fieldset>
      <legend>Ingresá a tu cuenta con tus datos</legend>
      <section class="users"
        v-if="fast_login">
        <card v-for="user in users"
          :key="user.id"
          to="/inventories"
          prevent
          @click.native="login(user, 'fast')">
          <template v-slot:title>
            {{ `${user.name} ${user.lastname}` }}
          </template>
          <template v-slot:left>
            <span>{{ $store.getters.inventories_quantity | format_plural('inventario') }}</span>
          </template>
          <template v-slot:right
            v-if="user.sync_code">
            <span>{{ user.sync_code }}</span>
          </template>
        </card>
      </section>
      <template v-else>
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
      </template>
      <span class="change-login"
        @click="fast_login = !fast_login">Ingreso {{ fast_login ? 'con código' : 'rápido' }}</span>
    </fieldset>

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
        users: [],
        fast_login: true
      }
    },
    async beforeMount() {
      const response = await IDB.read('users')
      if (response.success && response.result.length > 0) {
        this.users = response.result
      } else {
        this.fast_login = false
      }
    },
    mixins: [formValidation],
    methods: {
      async login(data) {
        if (!data) return
        let logged = false

        if (this.fast_login) {
          logged = await this.$store.dispatch('login', data)
          const load_inventories = await this.$store.dispatch('load_inventories', data.id) 
        } else if (!this.fast_login) {
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
  span.change-login {
    @extend a;
    justify-content: center;
  }
</style>