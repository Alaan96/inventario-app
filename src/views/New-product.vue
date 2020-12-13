<template>
  <div class="layout">
    <header-area back>
      <h1>Agregar producto</h1>
    </header-area>
    <product-form @submit="add_product($event)" />
  </div>
</template>

<script>
  import headerArea from '@/components/header.vue'
  import product_form from '@/components/product-form.vue'

  import { v4 as uuid } from 'uuid'

  export default {
    components: {
      headerArea,
      'product-form': product_form,
    },
    methods: {
      async add_product(product) {
        product.inventory = this.$route.params.id
        
        const { success } = await this.$store.dispatch('add_product', product)
        if (success) this.$router.push(`/inventory/${product.inventory}`)
      }
    }
  }
</script>
