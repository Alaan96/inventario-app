<template>
  <header>
    <btn class="icon" v-if="back" :to="back">
      <arrow direction="left"></arrow>
    </btn>
    <slot></slot>
  </header>
</template>

<script>
  import btn from '@/components/btn.vue'
  import arrow_icon from '@/components/icons/arrow.vue'

  export default {
    components: {
      btn,
      arrow: arrow_icon,
    },
    props: {
      back: String
    }
  }
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    flex: 0 0 5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    gap: .5rem; // No soportado totalmente
    border-bottom: 1px solid var(--accent);
    & h1 {
      flex: auto;
    }
  }
</style>