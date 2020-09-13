<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="12.828" height="21.657" viewBox="0 0 12.828 21.657"
    :style="arrow_direction">
    <path d="M4300,1909.9l8,8-8,8" transform="translate(-4297.172 -1907.072)"/>
  </svg>
</template>

<script>
  export default {
    props: {
      direction: {
        type: String,
        default: 'right'
      }
    },
    computed: {
      arrow_direction() {
        switch (this.direction) {
          case 'left':
            return 'transform: rotate(180deg);'
            break;
          case 'up':
            return 'transform: rotate(90deg);'
            break;
          case 'down':
            return 'transform: rotate(270deg);'
            break;
          case 'right':
            return 'transform: rotate(0deg);'
            break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  path {
    fill: none;
    stroke: var(--tertiary);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4;
  }
</style>