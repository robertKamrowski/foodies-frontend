<template>
  <VCard>
    <!--  Tabs -->
    <VTabs v-model="tab" center-active centered show-arrows>
      <VTab v-for="({ name }, index) in items" :key="`${name}-${index}`">
        {{ name }}
      </VTab>
    </VTabs>
    <TheRecipesDialogWithActivatorBtn :day="activeDay" />
    <!--  Tabs content -->
    <VTabsItems v-model="tab">
      <VTabItem v-for="{ content } in items" :key="content">
        <VSheet class="px-6 py-4">
          <VRow>
            <VCol
              v-for="{ _id, ingredients, makro, steps, title } in $auth.user
                .dietSchedule[content]"
              :key="_id"
              cols="12"
              lg="4"
              sm="6"
            >
              <RecipeCard
                :id="_id"
                :day="content"
                :ingredients="ingredients"
                :makro="makro"
                :steps="steps"
                :title="title"
                show-done-btn
              />
            </VCol>
          </VRow>
        </VSheet>
      </VTabItem>
    </VTabsItems>
  </VCard>
</template>

<script>
export default {
  name: 'TheDayScheduleTabs',
  data: () => ({
    activeDay: 'monday',
    tab: null,
    items: [
      { name: 'Niedziela', content: 'sunday' },
      { name: 'Poniedziałek', content: 'monday' },
      { name: 'Wtorek', content: 'tuesday' },
      { name: 'Środa', content: 'wednesday' },
      { name: 'Czwartek', content: 'thursday' },
      { name: 'Piątek', content: 'friday' },
      { name: 'Sobota', content: 'saturday' }
    ]
  }),
  watch: {
    tab(currentValue) {
      this.activeDay = this.items[currentValue].content
    }
  },
  created() {
    this.tab = new Date().getDay()
  }
}
</script>

<style lang="scss" scoped></style>
