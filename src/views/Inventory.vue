<template>
  <div class="layout" v-if="inventory">
    <header-area>
      <btn
        to="/inventories"
        class="icon">
        <arrow direction="left"></arrow>
      </btn>
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
      <Product-list />
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
  import arrow_icon from '@/components/icons/arrow.vue'
  import cross_icon from '@/components/icons/cross.vue'
  import edit_icon from '@/components/icons/edit.vue'
  import editForm from '@/components/inventory-form.vue'
  import card from '@/components/card.vue'
  import product_list from '@/components/product/list.vue'

  export default {
    components: {
      'header-area': header,
      btn,
      arrow: arrow_icon,
      'cross-icon': cross_icon,
      'edit-icon': edit_icon,
      editForm,
      card,
      'Product-list': product_list,
    },
    data() {
      return {
        inventory: {},
        edit: false,
      }
    },
    mounted() {
      this.get_inventory()
    },
    methods: {
      get_inventory() {
        this.inventory = this.$store.state.inventories.list[this.$route.params.id]
      },
      async save_changes(inventory) {
        const success = await this.$store.dispatch('edit_inventory', inventory)

        if (success) {
          this.edit = false
          this.get_inventory()
        }
      },
      async leave(id) {
        const res = await this.$store.dispatch('leave', id)

        if (res) this.$router.push('/inventories')
      }
    }
  }
</script>

<style lang="scss">

</style>