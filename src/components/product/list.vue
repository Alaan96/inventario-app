<template>
  <section>
    <filterField id="product-filter"
      name="filter"
      placeholder="Buscar productos..."
      v-model="filter" />
    <div class="product-list">
      <header
        class="row">
        <span
          v-for="field in fields"
          :key="field">
          {{ field }}
        </span>
      </header>
      <product
        v-for="product in products"
        :key="product.id"
        :data="product"
        class="row" />
    </div>
  </section>
</template>

<script>
  import product from './product.vue'
  import filterField from '../inputs/filter.vue'

  export default {
    components: {
      product,
      filterField,
    },
    data() {
      return {
        filter: '',
        fields: [
          'Nombre del producto',
          'Vencimiento',
          // 'Cantidad',
          // 'Marca',
          // 'Precio',
        ],
      }
    },
    computed: {
      products() {
        return this.$store.state.products.list
                .filter(product => product.inventory === this.$route.params.id)
                .filter(product => (product.name.toLowerCase()).includes(this.filter.toLowerCase()))
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-list {
    width: 100%;
    padding: 1rem;
    overflow: hidden;
    & .row {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
    }
    & header {
      margin-bottom: 1rem;
      color: var(--tertiary-dark);
      & span {
        flex: auto;
        font-weight: 600;
      }
    }
  }
</style>