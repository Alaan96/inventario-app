<template>
  <form class="session"
    @submit.prevent>
    <fieldset>
      <legend>Completá estos datos para registrarte</legend>
      <field id="name"
        name="name"
        placeholder="Tu nombre"
        required
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$"
        v-model="user.name">
        Nombre
      </field>
      <field id="lastname"
        name="lastname"
        placeholder="Tu apellido"
        required
        pattern="^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$"
        v-model="user.lastname">
        Apellido
      </field>
      <btn type="submit"
        :disabled="!ready"
        @click.native="register(user)">
        Registrarse
      </btn>
    </fieldset>

    <router-link to="/login" class="go-to">Ya tengo cuenta</router-link>
    <confirm
      v-if="showModal"
      :cancel="false"
      @confirm="$router.push('/login')">
      {{ response.message }}
      <template v-slot:description>
        <span v-if="response.result.sync_code">Tu código de ingreso es: {{ response.result.sync_code }}</span>
      </template>
    </confirm>
  </form>
</template>

<script>
  import field from '@/components/inputs/field.vue'
  import btn from '@/components/btn.vue'
  import confirm from '@/components/confirm.vue'
  
  import formValidation from '@/mixins/form-validation.js'
  import IDB from '@/idb.js'

  export default {
    components: {
      field,
      btn,
      confirm
    },
    data() {
      return {
        user: {
          name: '',
          lastname: ''
        },
        showModal: false,
      }
    },
    mixins: [formValidation],
    methods: {
      async register(user) {
        if (!this.ready) return

        this.response = await this.$store.dispatch('register', user)
        this.showModal = true
      }
    }
  }
</script>