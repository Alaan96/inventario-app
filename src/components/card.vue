<template>
  <button class="card">
    <header>
      <slot name="title"></slot>
      <arrow></arrow>
    </header>
    <div>
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </button>
</template>

<script>
  import arrow_icon from '@/components/icons/arrow.vue'

  export default {
    components: {
      'arrow': arrow_icon
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    color: var(--tertiary);
    background: var(--accent);
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    &:hover {
      background: var(--accent-bright);
    }
    &:focus {
      outline: none;
      background: var(--accent-bright);
    }
    & * {
      display: flex;
      justify-content: space-between;
    }
    & header {
      height: 2em;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
</style>