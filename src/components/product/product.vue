<template>
  <div class="product"
    :class="{selected}"
    :style="{transform: `translateX(${touches.move}px)`}"
    @touchstart="start_selection()"
    @touchmove="move_product()"
    @touchcancel="leave_selection()"
    @touchend="leave_selection()">
    <div>{{ data.name }}</div>
    <div>{{ data.expiration }}</div>
    <!-- <div>{{ data.amount }}</div> -->
    <!-- <div>{{ data.brand }}</div> -->
    <!-- <div>{{ data.price }}</div> -->
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: function() {
          return {
            name: '',
            expiration: '',
          }
        }
      }
    },
    data() {
      return {
        selected: false,
        touches: {
          start: 0,
          move: 0,
          end: 0,
        },
      }
    },
    methods: {
      start_selection() {
        this.selected = true
        this.touches.start = event.touches[0].clientX
      },
      move_product() {
        const offset = 60
        this.touches.end = event.touches[0].clientX
        this.touches.move = this.touches.end - this.touches.start
      },
      leave_selection() {
        this.selected = false

        if (this.touches.move >= 200 || this.touches.move <= -200) {
          this.remove()
        } else {
          this.touches.move = 0
        }
      },
      remove() {
        console.log('Remover producto')
        this.$store.dispatch('remove_product', this.data.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product {
    height: 3rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: var(--tertiary);
    font-weight: 600;
    background: var(--accent-dark);
    border-radius: .5rem;
    cursor: pointer;
    transition: .4s ease;
    &.selected {
      color: var(--accent-light);
      background: var(--tertiary);
      transition: none;
    }
  }
</style>