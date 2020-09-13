<template>
  <button v-bind="$attrs"
    :disabled="disabled"
    :class="{danger, ghost, icon}">
    <router-link v-if="to" :to="to"></router-link>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      disabled: Boolean,
      to: String,
      icon: Boolean,
      danger: Boolean,
      ghost: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  button {
    --btn-fill: var(--accent);
    --btn-text: var(--tertiary);
    --btn-border: none;
    width: 100%;
    height: 3em;
    @include center;
    position: relative;
    font-size: 1rem;
    font-family: $font;
    font-weight: 600;
    color: var(--btn-text);
    background: var(--btn-fill);
    border: var(--btn-border);
    border-radius: .25rem;
    cursor: pointer;
    &:hover, &:focus {
      filter: brightness(1.15);
    }
    &:active {
      filter: brightness(1.4);
    }
    &:focus {
      outline: none;
    }
    &[disabled] {
      opacity: .5;
    }
    & a {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 50;
    }
  }

  button.danger {
    --btn-fill: var(--error-bright);
  }

  button.danger.ghost {
    --btn-fill: transparent;
    --btn-text: var(--error-bright);
    // --btn-border: 1px solid var(--error-bright);
  }


  button.icon {
    --btn-fill: transparent;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    &:hover {
      --btn-fill: var(--hover);
    }
  }

  button.icon.accent {
    --btn-fill: var(--accent-bright);
  }
</style>