<template>
  <div class="backdrop">
    <div data-modal="confirm">
      <header><slot></slot></header>
      <slot name="description"></slot>
      <div class="actions">
        <btn @click.native="$emit('confirm')">
          <slot name="confirm">Aceptar</slot>
        </btn>
        <btn danger
          v-if="cancel"
          @click.native="$emit('cancel')">
          <slot name="cancel">Cancelar</slot>
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
  import btn from '@/components/btn.vue'
  export default {
    components: {
      btn
    },
    props: {
      cancel: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .backdrop {
    width: 100vw;
    height: 100vh;
    @include center;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(.25rem);
    background: rgba(0, 0, 0, .5);
  }
  div[data-modal="confirm"] {
    max-width: 24rem;
    width: 80%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    font-size: .75rem;
    color: var(--tertiary-dark);
  }
  header {
    font-size: 1.5rem;
    color: var(--tertiary);
  }
  .actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    & button {
      max-width: 10rem;
    }
  }
</style>