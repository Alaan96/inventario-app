<template>
  <div id="splash">
    <h1><slot></slot></h1>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  #splash {
    width: 100vw;
    height: 100vh;
    @include center;
  }
</style>