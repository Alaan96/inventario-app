<template>
  <div id="home">
    <splash>Inventario</splash>
  </div>
</template>

<script>
  import splash from '@/components/splash.vue'

  export default {
    components: {
      splash
    },
    mounted() {
      setTimeout(() => {
        if (!localStorage.getItem('logged-as')) {
          this.$router.push('/login')
        } else {
          this.$router.push('/inventories')
        }
      }, 1500);
    }
  }
</script>
