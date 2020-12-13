<template>
  <div class="layout">
    <header-area back>
      <h1>Editar producto</h1>
    </header-area>
    <product-form :product_data="product"
      @submit="save_changes($event)"
      @remove="remove_product($event)" />
  </div>
</template>

<script>
  import headerArea from '@/components/header.vue'
  import productForm from '@/components/product-form.vue'

  export default {
    components: {
      headerArea,
      productForm
    },
    data() {
      return {
        product: {}
      }
    },
    beforeMount() {
      this.product = this.$store.state.products.list[this.$route.params.id]
                      .find(product => product.id === this.$route.params.product_id)
    },
    methods: {
      async save_changes(product) {
        if (product) {
          const res = await this.$store.dispatch('edit_product', product)

          if (res.success) this.$router.push(`/inventory/${product.inventory}`)
        }
      },
      async remove_product(product) {
        if (product) {
          const res = await this.$store.dispatch('remove_product', product)

          if (res.success) this.$router.push(`/inventory/${product.inventory}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>