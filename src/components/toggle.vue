<template>
  <button data-action="toggle">
    <input type="checkbox"
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
  }
</style>