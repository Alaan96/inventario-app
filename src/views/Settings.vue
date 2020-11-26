<template>
  <div class="layout">
    <header-area back>
      <h1>Configuración</h1>
    </header-area>
    <main>
      <section>
        <h2>Datos de usuario</h2>
        <ul>
          <li>
            <label for="user-name">Nombre</label>
            <input type="text" :value="user.name" readonly>
          </li>
          <li>
            <label for="user-lastname">Apellido</label>
            <input type="text" :value="user.lastname" readonly>
          </li>
        </ul>
      </section>
      <section>
        <h2>Otros</h2>
        <ul>
          <li>
            <label for="offline-mode">Inventario online</label>
            <toggle
              :text="['Desactivado', 'Activado']"
              @click.native="confirm_change(online)"
              v-model="online" />
          </li>
        </ul>
      </section>
      <section>
        <btn danger ghost
          @click.native="logout()">
          Cerrar sesión
        </btn>
      </section>
    </main>
    <confirm
      v-if="show_confirm"
      @confirm="show_confirm = false, online = true"
      @cancel="show_confirm = false">
      ¿Desea activar el inventario online?
      <template v-slot:description>
        <p>En caso de no estar conectado a una red <b>Wi-Fi</b> se usarán los <b>datos móviles</b> del dispositivo.</p>
      </template>
    </confirm>
  </div>
</template>

<script>
  import header from '@/components/header.vue'
  import btn from '@/components/btn.vue'
  import toggle from '@/components/toggle.vue'

  import confirm from '@/components/confirm.vue'

  export default {
    components: {
      'header-area': header,
      btn,
      toggle,
      confirm
    },
    data() {
      return {
        show_confirm: false,
        online: false
      }
    },
    computed: {
      user() {
        const user = this.$store.getters.user

        // Error en consola: retorna null al recargar la página
        if (!user) return {} // Solución
        return user
      }
    },
    methods: {
      confirm_change(value) {
        if (value === false) {
          event.preventDefault()
          this.show_confirm = true
        }
      },
      logout() {
        localStorage.removeItem('logged-as')
        this.$store.commit('empty_inventories')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  main {
    padding: 1.5rem 1rem;
    background: var(--primary);
  }

  section {
    margin: 2rem 0;
    margin-block-start: 0;
    & h2, .status {
      display: inline-block;
    }
    & ul, button {
      background: var(--secondary);
      border-radius: .5rem;
    }
    & ul {
      margin: .5rem 0;
      padding: 0 1rem;
      & li {
        height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem; // No soportado totalmente
        &:not(:last-child) {
          border-bottom: 1px solid var(--hover);
        }
        & *:nth-child(1) {
          flex: 1 0 auto;
        }
        & *:nth-child(2) {
          flex: 0 0 8rem;
        }
      }
    }
  }

  input {
    text-align: right;
  }
</style>