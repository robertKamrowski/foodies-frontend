<template>
  <VCard>
    <!--  Tabs -->
    <VTabs v-model="tab" center-active centered show-arrows>
      <VTab v-for="({ name }, index) in items" :key="`${name}-${index}`">
        {{ name }}
      </VTab>
    </VTabs>
    <TheRecipesDialogWithActivatorBtn :selected-meals="2" />
    <!--  Tabs content -->
    <VTabsItems v-if="$auth.user.dietPlan" v-model="tab" vertical>
      <VTabItem v-for="{ content } in items" :key="content">
        <VSheet class="px-6 py-4">
          <VRow>
            <VCol
              v-for="recipe in $auth.user.dietSchedule[content]"
              :key="recipe._id"
              cols="12"
              lg="4"
              sm="6"
            >
              <RecipeCard
                :id="recipe._id"
                :ingredients="recipe.ingredients"
                :makro="recipe.makro"
                :steps="recipe.steps"
                :title="recipe.title"
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
    tab: null,
    items: [
      { name: 'Poniedziałek', content: 'monday' },
      { name: 'Wtorek', content: 'tuesday' },
      { name: 'Środa', content: 'wednesday' },
      { name: 'Czwartek', content: 'thursday' },
      { name: 'Piątek', content: 'friday' },
      { name: 'Sobota', content: 'saturday' },
      { name: 'Niedziela', content: 'sunday' }
    ]
  }),
  created() {
    this.tab = new Date().getDay() - 1
  }
}
</script>

<style lang="scss" scoped></style>
