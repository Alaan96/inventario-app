<template>
  <button class="card">
    <header>
      {{title}}
      <arrow></arrow>
    </header>
    <div>
      0 inventarios
    </div>
  </button>
</template>

<script>
  import arrow_icon from '@/components/icons/arrow.vue'

  export default {
    components: {
      'arrow': arrow_icon
    },
    props: {
      title: {
        type: String,
        required: true
      }
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
      filter: brightness(1.25);
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