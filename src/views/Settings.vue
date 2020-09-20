<template>
  <div class="layout">
    <header>
      <div>
        <btn class="icon" to="/inventories">
          <arrow direction="left"></arrow>
        </btn>
        <h1>Configuración</h1>
      </div>
    </header>
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
            <label for="offline-mode">Modo sin conexión</label>
            <toggle
              :text="['Desactivado', 'Activado']"
              v-model="others.offline_mode"
            />
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
  </div>
</template>

<script>
  import btn from '@/components/btn.vue'
  import arrow_icon from '@/components/icons/arrow.vue'
  import toggle from '@/components/toggle.vue'

  export default {
    components: {
      btn,
      arrow: arrow_icon,
      toggle
    },
    data() {
      return {
        others: {
          offline_mode: true
        }
      }
    },
    computed: {
      user() {
        const user = this.$store.getters.user

        // Error en consola: retorna null al recargar la página
        if (!user) { return {} } // Solución
        else { return user }
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('logged-as')
        this.$store.commit('empty_inventories')
        this.$router.push('login')
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
      padding: .5rem 1rem;
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
          flex: 0 0 9rem;
        }
      }
    }
  }

  input {
    text-align: right;
  }
</style>