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
    <div class="code">
      <input 
        v-for="(char, index) in chars"
        :key="'field-code' + index"
        type="text"
        :ref="'field-code' + char"
        :id="id + char"
        :name="name + char"
        placeholder="-"
        :pattern="pattern"
        :required="required"
        autocomplete="off"
        spellcheck="false"
        :value="value[index]"
        :readonly="valid"
        @input="complete_code(index)">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      name: String,
      pattern: {
        type: String,
        default: '^(\\w)',
      },
      required: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      chars: {
        type: Number,
        default: 4
      },
      value: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        position: 1,
        code: [],
      }
    },
    watch: {
      position(value) {
        if (value < 0 || value > this.chars) return this.position = this.chars

        this.$refs['field-code' + value][0].focus()
      }
    },
    computed: {
      valid() {
        if (!this.required) return true

        return new RegExp(`${this.pattern}{${this.chars}}$`).test(this.value)
      }
    },
    async mounted() {
      for (let char = 1; char <= this.chars; char++) {
        this.code.push('')
      }
      if (this.autofocus) this.$refs['field-code' + this.position][0].focus()
    },
    methods: {
      complete_code(index) {
        this.code[index] = event.target.value
        this.$emit('input', this.code.join(''))
        if (event.inputType === 'insertText') this.focus_char()
      },
      focus_char(char = null) {
        if (!char) return this.position += 1

        if (char > 0 && char <= this.chars) this.position = char
      }
    }
  }
</script>

<style lang="scss" scoped>
  .code {
    width: 100%;
    display: flex;
    gap: 1rem;
  }
  input {
    width: 100%;
    flex: 1 1 auto;
    font-size: 1.25rem;
    text-align: center;
  }
</style>