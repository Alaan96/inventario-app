<template>
  <div class="layout">
    <header-area back>
      <h1>Nuevo inventario</h1>
    </header-area>
    <inventory-form @submit="create_inventory($event)"/>
  </div>
</template>

<script>
  import header from '@/components/header.vue'
  import form from '@/components/inventory-form.vue'

  import { v4 as uuid } from 'uuid'

  export default {
    components: {
      'header-area': header,
      'inventory-form': form
    },
    methods: {
      async create_inventory(inventory) {
        const { success } = await this.$store.dispatch('create_inventory', inventory)

        if (success) this.$router.push('/inventories')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .field[data-input="address"] {
    flex: 3 1 auto;
  }
  .field[data-input="number"] {
    flex: 1 0 8em;
  }
</style>