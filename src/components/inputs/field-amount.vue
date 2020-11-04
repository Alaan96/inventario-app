<template>
  <div class="field">
    <label :for="id"><slot></slot></label>
    <span v-if="!required && value === 1"
      class="status empty">
      opcional
    </span>
    <span v-else-if="value > 0"
      class="status"
      :class="[{'invalid': !valid}]">
      {{ valid ? 'válido' : 'inválido' }}
    </span>
    <input type="text"
      ref="input_amount"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :pattern="pattern"
      :required="required"
      autocomplete="off"
      spellcheck="false"
      :value="value"
      @input="inputAmount($event), validate()">
    <div v-if="controls"
      class="controls">
      <btn icon
        tabindex="-1"
        @click.native.prevent="$emit('input', ++number)">
        +
      </btn>
      <btn icon
        tabindex="-1"
        @click.native.prevent="$emit('input', --number)">
        -
      </btn>
    </div>
  </div>
</template>

<script>
  import btn from '../btn.vue'

  export default {
    components: {
      btn,
    },
    props: {
      id: String,
      name: String,
      placeholder: String,
      pattern: {
        type: String,
        default: '^([0-9])+$',
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
        type: Number,
        required: true,
      },
      controls: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        number: 1,
        valid: this.required ? false : true,
      }
    },
    async mounted() {
      if (this.autofocus) this.$refs.input_amount.focus()
      await this.$nextTick()
      this.validate()
    },
    methods: {
      inputAmount(event) {
        const inputValue = event.target.value
        if (inputValue === '') {
          this.$refs.input_amount.value = '00'
          this.number = 0
        }
        if (new RegExp(this.pattern).test(inputValue)) {
          const value = Number(inputValue)
          this.number = value
          this.$emit('input', value)
        } else {
          this.$refs.input_amount.value = this.$refs.input_amount.value.slice(0, -1)
        }
      },
      validate() {
        if (this.required) this.valid = this.$refs.input_amount.validity.valid
      },
    },
  }
</script>

<style lang="scss" scoped>
  .controls {
    flex: 0 1 auto;
    display: flex;
    position: absolute;
    top: 42%;
    right: .5rem;
    & button {
      font-size: 2rem;
    }
  }
</style>