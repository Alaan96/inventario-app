<template>
  <div class="product"
    :class="{selected}"
    :style="{transform: `translate3d(${position}px, 0, 0)`}"
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
        touch_start: 0,
        position: 0,
        start: null,
      }
    },
    methods: {
      start_selection() {
        this.selected = true
        this.touch_start = event.touches[0].clientX
      },
      move_product() {
        const touch_end = event.touches[0].clientX
        requestAnimationFrame(() => {
          this.position = touch_end - this.touch_start
        })
      },
      leave_selection() {
        this.selected = false

        if (this.position >= 200 || this.position <= -200) {
          this.remove()
        } else {
          this.position = 0
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
      color: var(--tertiary);
      background: var(--accent-bright);
      transition: none;
    }
  }
</style>