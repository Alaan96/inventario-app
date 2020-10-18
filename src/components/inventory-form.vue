<template>
  <form @keyup="valid_inputs()" @submit.prevent>
    <div class="field">
      <label for="inventory-name">Nombre</label>
      <span class="status" :class="{'invalid': !valid.name}">{{status.name}}</span>
      <input type="text"
        id="inventory-name"
        name="name"
        autocomplete="off"
        placeholder="Alias del inventario"
        pattern="^([\w ÁáÉéÍíÓóÚúÑñ])+$"
        spellcheck="false"
        required="true"
        v-model="inventory.name">
    </div>
    <div class="field" data-input="address">
      <label for="inventory-address">Domicilio</label>
      <span class="status" :class="{'invalid': !valid.address}">{{status.address}}</span>
      <input type="text"
        id="inventory-address"
        name="address"
        autocomplete="off"
        placeholder="Calle o avenida"
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ.])+$"
        spellcheck="false"
        required="true"
        v-model="inventory.address">
    </div>
    <div class="field" data-input="number">
      <label for="inventory-number">Altura</label>
      <span class="status" :class="{'invalid': !valid.number}">{{status.number}}</span>
      <input type="text"
        inputmode="numeric"
        id="inventory-number"
        name="number"
        autocomplete="off"
        placeholder="12345"
        pattern="^([\d]{2,5})+$"
        spellcheck="false"
        required="true"
        v-model="inventory.number">
    </div>
    <div class="field">
      <label for="inventory-comment">Comentario</label>
      <span class="status empty">- Opcional</span>
      <input type="text"
        id="inventory-comment"
        name="comment"
        autocomplete="off"
        placeholder=""
        pattern="^([\w\sÁáÉéÍíÓóÚúÑñ.])+$"
        spellcheck="false"
        v-model="inventory.comment">
    </div>
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
  import btn from '@/components/btn.vue'
  
  export default {
    components: {
      btn
    },
    props: {
      data: Object
    },
    data() {
      return {
        inventory: {
          name: '',
          address: '',
          number: '',
          comment: '',
        },
        valid: {
          name: false,
          address: false,
          number: false
        },
        status: {
          name: '',
          address: '',
          number: '',
        }
      }
    },
    computed: {
      ready() {
        const valid = this.valid
        if (valid.name && valid.address && valid.number) return true
        return false
      }
    },
    mounted() {
      this.load_data(this.data)
    },
    methods: {
      load_data(data) {
        if (data) {
          this.inventory = this.data

          this.valid.name = true
          this.valid.address = true
          this.valid.number = true
        }
      },
      valid_inputs() {
        const target = event.target
        if (target.tagName === 'INPUT') {
          const name = target.name
          const pattern = new RegExp(target.pattern)
          const value = target.value
          const valid = pattern.test(value)

          if (target.value.length >= 2 && valid) {
            this.valid[name] = true
            this.status[name] = 'válido'
          } else if (target.value.length >= 2 && !valid) {
            this.valid[name] = false
            this.status[name] = 'inválido'
          } else if (target.value.length === 0) {
            this.valid[name] = false
            this.status[name] = ''
          }
        } 
      },
    }
  }
</script>

<style lang="scss" scoped>
  button.danger {
    margin-top: 5rem;
  }
</style>