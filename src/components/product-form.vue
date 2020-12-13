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
    <btn danger ghost v-if="product_data"
      @click.native="$emit('remove', product)">
      Eliminar producto
    </btn>
  </form>
</template>

<script>
  import field from '@/components/inputs/field.vue'
  import fieldAmount from '@/components/inputs/field-amount.vue'
  import fieldDate from '@/components/inputs/field-date.vue'
  import btn from './btn.vue'

  import formValidation from '@/mixins/form-validation.js'

  export default {
    components: {
      field,
      fieldAmount,
      fieldDate,
      btn,
    },
    props: {
      product_data: {
        type: [Object, null],
        default: null
      }
    },
    data() {
      return {
        product: {
          name: '',
          expiration: '',
          amount: 1,
          brand: '',
        }
      }
    },
    mounted() {
      if (this.product_data) {
        Object.assign(this.product, this.product_data)
      }
    },
    mixins: [formValidation],
    methods: {
      submit() {
        if (this.ready) this.$emit('submit', this.product)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>