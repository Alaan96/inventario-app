<template>
  <div class="layout" v-if="inventory">
    <header-area back>
      <h1>{{edit ? 'Editar inventario' : inventory.name}}</h1>
      <btn 
        v-if="!edit"
        class="icon accent"
        :to="`/new-product/${$route.params.id}`">
        <cross-icon></cross-icon>
      </btn>
      <btn class="icon"
        :pressed="edit"
        @click.native="edit = !edit">
        <edit-icon></edit-icon>
      </btn>
    </header-area>

    <!-- View -->
    <main v-if="!edit">
      <div class="empty-list" v-if="$store.state.products.list.length === 0">
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
      </div>
      <Product-list v-else />
    </main>

    <!-- Edit -->
    <main v-else data-context="edit">
      <edit-form :data="inventory"
        @submit="save_changes($event)"
        @leave="leave(inventory.id)"
      />
    </main>
  </div>
</template>

<script>
  import header from '@/components/header.vue'
  import btn from '@/components/btn.vue'
  import cross_icon from '@/components/icons/cross.vue'
  import edit_icon from '@/components/icons/edit.vue'
  import form from '@/components/inventory-form.vue'
  import card from '@/components/card.vue'
  import product_list from '@/components/product/list.vue'

  export default {
    components: {
      'header-area': header,
      btn,
      'cross-icon': cross_icon,
      'edit-icon': edit_icon,
      'edit-form': form,
      card,
      'Product-list': product_list,
    },
    data() {
      return {
        edit: false,
      }
    },
    computed: {
      inventory() {
        return this.get_inventory(this.$route.params.id)
      },
    },
    methods: {
      get_inventory(id) {
        return this.$store.getters.inventories
                .find( inventory => inventory.id === id)
      },
      async save_changes(inventory) {
        const res = await this.$store.dispatch('edit_inventory', inventory)

        if (res) this.edit = false
      },
      async leave(id) {
        const inventory_res = await this.$store.dispatch('leave', id)
        const user_res = await this.$store.dispatch('leave_inventory', id)

        if (inventory_res && user_res) this.$router.push('/inventories')
      }
    }
  }
</script>

<style lang="scss" scoped>
  main {
    padding: 0;
    &[data-context="edit"] {
      background: var(--primary);
    }
  }
</style>