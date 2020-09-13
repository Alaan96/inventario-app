<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import IDB from '@/idb.js'
  
  export default {
    async beforeCreate() {
      const logged_as = localStorage.getItem('logged-as')
      console.log('Logged as: ' + logged_as);

      if (!logged_as) this.$router.push('/login')

      const user = await IDB.get('users', logged_as)

      if (!user) {
        this.$router.push('/login')
      } else {
        this.$store.commit('login', user)
        // this.$router.push('/inventories')
      }
    }
  }
</script>
