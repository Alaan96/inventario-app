<template>
  <form @submit.prevent>
    <field id="inventory-name"
      name="name"
      placeholder="Alias del inventario"
      required
      autofocus
      v-model="inventory.name">
      Nombre
    </field>
    <field id="inventory-address"
      data-input="address"
      name="address"
      placeholder="Calle o avenida"
      v-model="inventory.address">
      Domicilio
    </field>
    <field id="inventory-number"
      data-input="number"
      inputmode="numeric"
      name="number"
      placeholder="12345"
      pattern="^([\d]{2,5})$"
      v-model="inventory.number">
      Altura
    </field>
    <field id="inventory-comment"
      name="comment"
      placeholder=""
      v-model="inventory.comment">
      Comentario
    </field>
    <btn :disabled="!ready"
      type="submit"
      @click.native="$emit('submit', inventory)">
      Aceptar
    </btn>
    <btn danger ghost v-if="data"
      @click.native="$emit('leave')">
      Abandonar inventario
    </btn>
  </form>
</template>

<script>
  import field from './inputs/field.vue'
  import btn from './btn.vue'

  import formValidation from '@/mixins/form-validation.js'
  
  export default {
    components: {
      field,
      btn,
    },
    props: {
      data: Object,
    },
    data() {
      return {
        inventory: {
          name: '',
          address: '',
          number: '',
          comment: '',
        }
      }
    },
    mounted() {
      this.load_data()
    },
    mixins: [formValidation],
    methods: {
      load_data() {
        if (this.data) Object.assign(this.inventory, this.data)
      },
    }
  }
</script>

<style lang="scss" scoped>
  button.danger {
    margin-top: 5rem;
  }
</style>