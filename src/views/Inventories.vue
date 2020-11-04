<template>
  <div class="layout">
    <header-area>
      <h1>Inventarios</h1>
      <btn class="icon accent" to="/new-inventory">
        <cross-icon></cross-icon>
      </btn>
      <btn class="icon" to="/settings">
        <settings-icon></settings-icon>
      </btn>
    </header-area>
    <main>
      <div class="empty-list" v-if="inventories.length === 0">
        <svg id="illustration" xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
          <g fill="none" stroke="#acacac" stroke-width="2">
            <rect width="160" height="160" rx="8" stroke="none"/>
            <rect x="1" y="1" width="158" height="158" rx="7" fill="none"/>
          </g>
        </svg>
        <span>No hay ningún inventario aún.</span>
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
      <template v-else>
        <card v-for="inventory in inventories"
          :key="inventory.id"
          :to="'/inventory/' + inventory.id">
          <template v-slot:title>
            {{ inventory.name }}
          </template>
          <template v-slot:left>
            <span>{{ inventory.content.length | format_plural('producto') }}</span>
          </template>
          <template v-slot:right>
            <span>{{ inventory.members.length | format_plural('integrante') }}</span>
          </template>
        </card>
      </template>
    </main>
  </div>
</template>

<script>
  import header from '@/components/header.vue'
  import btn from '@/components/btn.vue'
  import cross_icon from '@/components/icons/cross.vue'
  import settings_icon from '@/components/icons/settings.vue'
  import card from '@/components/card.vue'

  export default {
    components: {
      'header-area': header,
      btn,
      'cross-icon': cross_icon,
      'settings-icon': settings_icon,
      card
    },
    computed: {
      inventories() {
        return this.$store.getters.inventories
      }
    },
  }
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem 0;
  }
</style>