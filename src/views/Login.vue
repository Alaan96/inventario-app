<template>
  <form class="session"
    @submit.prevent>
    <legend>Ingresá a tu cuenta con tus datos</legend>

    <section class="users">
      <card v-for="user in users"
        :key="user.id"
        to="/inventories"
        prevent
        @click.native="login(user)">
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
  import card from '@/components/card.vue'

  import IDB from '@/idb.js'

  export default {
    components: {
      card
    },
    data() {
      return {
        users: []
      }
    },
    beforeMount() {
      this.get_users()
    },
    methods: {
      async get_users() {
        const response = await IDB.read('users')
        if (response.success) this.users = response.result
      },
      async login(user) {
        if (user) {
          console.log('Iniciando sesión...')
          // Login rápido
          const logged = await this.$store.dispatch('login', user)
          const load_inventories = await this.$store.dispatch('load_inventories', user.id) 
          
          if (logged) this.$router.push('/inventories')
        }
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
    gap: 1rem; // No soportado en su totalidad
  }
</style>