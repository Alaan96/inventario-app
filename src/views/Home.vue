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
        this.$router.push('/inventories')
      }, 1500);
    }
  }
</script>
