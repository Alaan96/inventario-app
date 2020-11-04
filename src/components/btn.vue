<template>
  <button v-bind="$attrs"
    :disabled="disabled"
    :class="{danger, ghost, icon, pressed}"
    @click="goBack()">
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
      back: Boolean,
      icon: Boolean,
      danger: Boolean,
      ghost: Boolean,
      pressed: Boolean,
    },
    methods: {
      goBack() {
        if (this.back) this.$router.go(-1)
      }
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
      --btn-fill: var(--accent-bright);
    }
    &:active {
      box-shadow: 0 0 .5rem var(--btn-fill);
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
  }


  button.icon {
    --btn-fill: transparent;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    &:hover, &:focus {
      --btn-fill: var(--hover);
    }
  }
  button.icon.pressed {
    --btn-fill: var(--tertiary-dark);
    --btn-text: var(--primary);
    & svg {
      fill: var(--accent-dark);
    }
    &:hover, &:focus {
      --btn-fill: var(--tertiary);
    }
  }

  button.icon.accent {
    --btn-fill: var(--accent-bright);
  }
</style>