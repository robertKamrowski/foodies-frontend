<template>
  <VApp>
    <VAppBar app class="px-6" clipped-left>
      <VSpacer />
      <VBtn class="mr-4" outlined @click="handleLogout"> Wyloguj </VBtn>
      <VAppBarNavIcon class="d-lg-none" @click="toggleSidebar" />
    </VAppBar>
    <VNavigationDrawer v-model="sidebarOpen" app clipped class="pt-8 px-6">
      nawigacja
    </VNavigationDrawer>
    <VMain>
      <Nuxt />
    </VMain>
  </VApp>
</template>

<script>
export default {
  name: 'AppLayout',
  data: () => ({
    sidebarOpen: null
  }),
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    async handleLogout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped></style>
