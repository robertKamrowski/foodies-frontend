<template>
  <div class="d-flex flex-column justify-space-between fill-height">
    <VList nav>
      <VListItem v-for="{ text, to, icon } in links" :key="text" :to="to" nuxt>
        <VListItemIcon>
          <VIcon v-text="icon" />
        </VListItemIcon>
        <VListItemContent>
          <VListItemTitle v-text="text" />
        </VListItemContent>
      </VListItem>
    </VList>
    <div>
      <VBtn class="mr-4" color="error" outlined block @click="handleLogout">
        Wyloguj
      </VBtn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarContent',
  data: () => ({
    links: [
      {
        text: 'Mój plan',
        to: '/',
        icon: 'mdi-calendar'
      },
      {
        text: 'Kalkulator kalorii',
        to: '/calculator',
        icon: 'mdi-calculator'
      },
      {
        text: 'Lista zakupów',
        to: '/shopping-list',
        icon: 'mdi-basket'
      },
      {
        text: 'Wszystkie diety',
        to: '/all-diets',
        icon: 'mdi-food-apple-outline'
      },
      {
        text: 'Porady',
        to: '/tips',
        icon: 'mdi-lightbulb-on'
      }
    ]
  }),
  methods: {
    async handleLogout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
