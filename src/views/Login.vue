<template>
  <form @submit.prevent>
    <legend>Ingresá a tu cuenta con tus datos</legend>

    <section class="users">
      <ingress-card v-for="user in users"
        :key="user.id"
        :title="`${user.name} ${user.lastname}`"
        @click.native="login(user)">
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
        if (response.success) this.users = response.results
      },
      async login(user) {
        if (user) {
          // Login rápido
          const logged = await this.$store.dispatch('login', user)
          
          if (logged) this.$router.push('/inventories')
        }
      }
    }
  }
</script>

<style lang="scss">
  section.users {
    width: 100%;
    & *:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
</style>