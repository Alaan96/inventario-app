<template>
  <section class="empty-list" v-if="products.length === 0">
    <svg id="illustration" xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <g fill="none" stroke="#acacac" stroke-width="2">
        <rect width="160" height="160" rx="8" stroke="none"/>
        <rect x="1" y="1" width="158" height="158" rx="7" fill="none"/>
      </g>
    </svg>
    <span>No hay ningún producto aún.</span>
    <span>
      Haz click en 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(-89.421 -581.421)">
          <circle cx="12" cy="12" r="12" transform="translate(89.421 581.421)" fill="#749eb3"/>
          <g transform="translate(96.421 588.452)">
            <line y2="10" transform="translate(5 -0.032)" fill="none" stroke="#fcfcfc" stroke-linecap="round" stroke-width="2"/>
            <line y2="10" transform="translate(10 4.849) rotate(90)" fill="none" stroke="#fcfcfc" stroke-linecap="round" stroke-width="2"/>
          </g>
        </g>
      </svg>
      para crear uno nuevo.
    </span>
  </section>

  <section v-else
    :data-context="edit ? 'edit': ''">
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
      <Product
        v-for="product in filtered_products"
        :key="product.id"
        :data="product"
        class="row"
        @click.native="edit = true" />
    </div>
  </section>
</template>

<script>
  import Product from './product.vue'
  import filterField from '../inputs/filter.vue'

  export default {
    components: {
      Product,
      filterField,
    },
    data() {
      return {
        products: [],
        filter: '',
        fields: [
          'Nombre del producto',
          'Vencimiento',
          // 'Cantidad',
          // 'Marca',
          // 'Precio',
        ],
        edit: false,
        // order_by: 'saved',
        // ascendent: false
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler(data) {
          this.load_products(data.params.id)
        }
      }
    },
    computed: {
      filtered_products() {
        return this.products.filter(product => (product.name.toLowerCase()).includes(this.filter.toLowerCase()))
      },
    },
    methods: {
      load_products(inventory_id) {
        this.products = this.$store.state.products.list[inventory_id] || []
      },
      save_changes(product_edited) {
        this.$store.commit('', product_edited)
        this.edit = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  section {
    height: 100%;
    background: var(--secondary);
    &[data-context="edit"] {
      background: var(--primary);
    }
  }
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