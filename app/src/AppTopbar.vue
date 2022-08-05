<template>
  <div class="layout-topbar" style="background-color: #4cc9f0">
    <router-link to="/" class="layout-topbar-logo">
      <img id="logo" alt="Project Flotta" :src="topbarImage()"/>
      <!--      <span>Project Flotta</span>-->
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
      <i class="pi pi-ellipsis-v"></i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },

    topbarImage() {
      return '../images/flotta-logo.png';
    }
  }
}
</script>

<style scoped>
#logo {
  height: 5rem;
}

.layout-topbar .layout-topbar-logo {
  width: 230px;
}
</style>