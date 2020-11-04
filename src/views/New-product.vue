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
        product.id = uuid()
        product.inventory = this.$route.params.id
        
        const res = await this.$store.dispatch('add_product', product)
        if (res) this.$router.go(-1)
      }
    }
  }
</script>
