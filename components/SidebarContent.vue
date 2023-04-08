<template>
  <div class="d-flex flex-column justify-space-between fill-height">
    <VList nav>
      <VListItem
        v-for="{ text, to, icon, iconColor } in links"
        :key="text"
        :to="to"
      >
        <VListItemIcon class="mr-4">
          <VIcon :color="iconColor">
            {{ icon }}
          </VIcon>
        </VListItemIcon>
        <VListItemContent>
          <VListItemTitle class="font-weight-medium">
            {{ text }}
          </VListItemTitle>
        </VListItemContent>
      </VListItem>
    </VList>
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
        icon: 'mdi-calendar',
        iconColor: 'indigo'
      },
      {
        text: 'Kalkulator kalorii',
        to: '/calculator',
        icon: 'mdi-calculator',
        iconColor: 'red'
      },
      {
        text: 'Wszystkie diety',
        to: '/all-diets',
        icon: 'mdi-food-apple-outline',
        iconColor: 'green'
      },
      {
        text: 'Progres',
        to: '/diet-progress',
        icon: 'mdi-chart-line-variant',
        iconColor: 'blue'
      }
    ]
  })
}
</script>

<style lang="scss" scoped></style>
