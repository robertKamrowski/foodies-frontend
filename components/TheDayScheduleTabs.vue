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
    <VTabsItems v-if="$auth.user.dietPlan" v-model="tab">
      <TheRecipesDialogWithActivatorBtn :selected-meals="3" />
      <VTabItem v-for="{ content } in items" :key="content">
        <VSheet class="px-6 py-4">
          <VRow>
            <VCol
              v-for="recipe in $auth.user.dietPlan.recipes"
              :key="recipe._id"
              cols="12"
              lg="4"
              sm="6"
            >
              <RecipeCard
                :ingredients="recipe.ingredients"
                :steps="recipe.steps"
                :title="recipe.title"
                :makro="recipe.makro"
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
      { name: 'Poniedziałek', content: '0 content' },
      { name: 'Wtorek', content: '1 content' },
      { name: 'Środa', content: '2 content' },
      { name: 'Czwartek', content: '3 content' },
      { name: 'Piątek', content: '4 content' },
      { name: 'Sobota', content: '5 content' },
      { name: 'Niedziela', content: '6 content' }
    ]
  }),
  computed: {},
  created() {
    this.tab = new Date().getDay() - 1
  }
}
</script>

<style lang="scss" scoped></style>
