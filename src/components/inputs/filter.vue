<template>
  <div class="field">
    <input type="text"
      ref="input"
      class="filter"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :pattern="pattern"
      :required="required"
      autocomplete="off"
      spellcheck="false"
      :value="value"
      @input="validate(), $emit('input', $event.target.value.trim())">
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      name: String,
      placeholder: String,
      pattern: {
        type: String,
        default: '^([\\w ÁáÉéÍíÓóÚúÑñ])+$',
      },
      required: {
        type: Boolean,
        default: false,
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        valid: this.required ? false : true,
      }
    },
    async mounted() {
      if (this.autofocus) this.$refs.input.focus()
      await this.$nextTick()
      this.validate()
    },
    methods: {
      validate() {
        this.valid = this.$refs.input.validity.valid
      },
    }
  }
</script>

<style lang="scss" scoped>
  input.filter {
    margin: 0;
    padding: 1.25em 1em;
    border-bottom: 1px solid var(--accent-dark);
    &::placeholder {
      color: var(--tertiary-dark);
    }
  }
</style>