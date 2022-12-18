<template>
  <VApp>
    <VAppBar app class="px-6" clipped-left>
      <VSpacer />
      <VAppBarNavIcon class="d-lg-none" @click="toggleSidebar" />
    </VAppBar>
    <VNavigationDrawer v-model="sidebarOpen" app clipped class="py-8 px-6">
      <SidebarContent />
    </VNavigationDrawer>
    <VMain class="mt-4 mx-4 mx-lg-8">
      <Nuxt />
    </VMain>
  </VApp>
</template>

<script>
export default {
  name: 'AppLayout',
  middleware: 'auth',
  data: () => ({
    sidebarOpen: null
  }),
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    }
  }
}
</script>

<style scoped></style>
