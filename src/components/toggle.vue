<template>
  <button data-action="toggle"
    :class="{active: value}">
    <input type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)">
    {{ value === true ? text[1] : text[0] }}
  </button>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      text: Array
    }
  }
</script>

<style lang="scss">
  button[data-action="toggle"] {
    height: 100%;
    padding: 0 .5rem;
    position: relative;
    font-size: 1rem;
    font-weight: 600;
    color: var(--tertiary-dark);
    background: transparent;
    border: none;
    &:hover {
      background: var(--hover);
    }
    & input {
      width: 100%;
      height: 100%;
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    &.active {
      color: var(--accent-bright);
      background: transparent;
      &:hover {
        background: var(--accent-dark);
      }
    }
  }
</style>