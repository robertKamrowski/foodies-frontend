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
      <VAlert
        v-show="alert.show"
        :type="alert.type"
        transition="scroll-x-transition"
        text
      >
        {{ alert.text }}
      </VAlert>
      <Nuxt />
    </VMain>
  </VApp>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppLayout',
  middleware: 'auth',
  data: () => ({
    sidebarOpen: null
  }),
  computed: {
    ...mapState(['alert'])
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    }
  }
}
</script>

<style scoped lang="scss"></style>
