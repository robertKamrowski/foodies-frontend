<template>
  <VCard>
    <!--  Tabs -->
    <VTabs v-model="tab" center-active centered show-arrows>
      <VTab v-for="({ name }, index) in items" :key="`${name}-${index}`">
        {{ name }}
      </VTab>
    </VTabs>
    <VDivider />
    <!--  Tabs content -->
    <VTabsItems v-model="tab" vertical>
      <VTabItem v-for="({ content }, index) in items" :key="index">
        <VCard class="mx-6 my-4" flat>
          {{ content }}
        </VCard>
      </VTabItem>
    </VTabsItems>
  </VCard>
</template>

<script>
export default {
  name: 'TheDayScheduleTabs',
  data: () => ({
    tab: null,
    items: [
      { name: 'Poniedziałek', content: '0 content' },
      { name: 'Wtorek', content: '1 content' },
      { name: 'Środa', content: '2 content' },
      { name: 'Czwartek', content: '3 content' },
      { name: 'Piątek', content: '4 content' },
      { name: 'Sobota', content: '5 content' },
      { name: 'Niedziela', content: '6 content' }
    ]
  }),
  created() {
    this.tab = new Date().getDay() - 1
  }
}
</script>

<style lang="scss" scoped></style>
