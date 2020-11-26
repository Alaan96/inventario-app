export default {
  data() {
    return {
      fields: this.$children
    }
  },
  computed: {
    ready() {
      let valid_fields = []
      this.fields.forEach(field => {
        if (field.$options._componentTag.includes('field')) valid_fields.push(field.valid)
      })
      if (valid_fields.every((field) => field === true)) return true
      return false
    }
  },
}