<template>
  <form @submit.prevent>
    <field id="product-name"
      name="name"
      placeholder="Nombre del producto"
      required
      autofocus
      v-model="product.name">
      Nombre
    </field>
    <field-date id="product-expiration"
      name="expiration"
      v-model="product.expiration">
      Vencimiento
    </field-date>
    <field-amount id="product-amount"
      name="amount"
      placeholder="1 unidad"
      v-model="product.amount">
      Cantidad
    </field-amount>
    <field id="product-brand"
      name="brand"
      placeholder="Marca del producto"
      v-model="product.brand">
      Marca
    </field>
    <btn :disabled="!ready"
      type="submit"
      @click.native="submit()">
      Agregar
    </btn>
  </form>
</template>

<script>
  import field from '@/components/inputs/field.vue'
  import fieldAmount from '@/components/inputs/field-amount.vue'
  import fieldDate from '@/components/inputs/field-date.vue'
  import btn from './btn.vue'

  export default {
    components: {
      field,
      fieldAmount,
      fieldDate,
      btn,
    },
    data() {
      return {
        product: {
          name: '',
          expiration: '',
          amount: 1,
          brand: '',
        },
        fields: this.$children,
      }
    },
    computed: {
      ready() {
        let valid_fields = []
        this.fields.forEach(field => {
          if (field.$options._componentTag == 'field') valid_fields.push(field.valid)
        })
        if (valid_fields.every((field) => field === true)) return true
        return false
      }
    },
    methods: {
      submit() {
        if (this.ready) this.$emit('submit', this.product)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>