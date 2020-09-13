<template>
  <div class="layout">
    <header>
      <h1>Inventarios</h1>
      <div>
        <btn class="icon accent" @click.native="add_inventory()">
          <cross-icon></cross-icon>
        </btn>
        <btn class="icon" to="/settings">
          <settings-icon></settings-icon>
        </btn>
      </div>
    </header>
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
    </main>
  </div>
</template>

<script>
  import btn from '@/components/btn.vue'
  import cross_icon from '@/components/icons/cross.vue'
  import settings_icon from '@/components/icons/settings.vue'

  export default {
    components: {
      btn,
      'cross-icon': cross_icon,
      'settings-icon': settings_icon
    },
    data() {
      return {
        inventories: []
      }
    },
    methods: {
      add_inventory() {
        console.log('Adding inventory...');
      }
    }
  }
</script>