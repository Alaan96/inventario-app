<template>
  <router-link :to="to" class="card" @click.native="navigate(prevent)">
    <header>
      <slot name="title"></slot>
      <arrow></arrow>
    </header>
    <div>
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </router-link>
</template>

<script>
  import arrow_icon from '@/components/icons/arrow.vue'

  export default {
    components: {
      arrow: arrow_icon
    },
    props: {
      to: String,
      prevent: Boolean
    },
    methods: {
      navigate(prevent) {
        if (prevent) event.preventDefault()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    max-width: 25rem;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    font-family: $font;
    color: var(--tertiary-dark);
    background: var(--accent-dark);
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    & * {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & header {
      height: 1.5em;
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--tertiary);
    }
  }

  .card:hover, .card:focus {
    background: var(--accent);
    color: var(--tertiary);
  }
</style>