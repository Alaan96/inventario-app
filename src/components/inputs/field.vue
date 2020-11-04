<template>
  <div class="field">
    <label :for="id"><slot></slot></label>
    <span v-if="!required && value.length === 0"
      class="status empty">
      opcional
    </span>
    <span v-else-if="value.length > 0"
      class="status"
      :class="[{'invalid': !valid}]">
      {{ valid ? 'válido' : 'inválido' }}
    </span>
    <input type="text"
      ref="input"
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
  
</style>