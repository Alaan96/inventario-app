<template>
  <form class="session"
    @submit.prevent>
    <legend>Ingresá a tu cuenta con tus datos</legend>

    <section class="users">
      <ingress-card v-for="user in users"
        :key="user.id"
        @click.native="login(user)">
        <template v-slot:title>
          {{`${user.name} ${user.lastname}`}}
        </template>
        <template v-slot:left>
          <span>{{user.inventories.length | format_inventories }}</span>
        </template>
      </ingress-card>
    </section>

    <router-link to="/register" class="go-to">No tengo cuenta</router-link>
  </form>
</template>

<script>
  import card from '@/components/card.vue'

  import IDB from '@/idb.js'

  export default {
    components: {
      'ingress-card': card
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
          // Login rápido
          const logged = await this.$store.dispatch('login', user)
          
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