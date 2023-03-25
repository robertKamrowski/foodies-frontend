<template>
  <VCard>
    <!--  Tabs -->
    <VTabs
      v-model="tabValue"
      center-active
      centered
      color="success"
      show-arrows
    >
      <VTab v-for="({ name }, index) in tabs" :key="`${name}-${index}`">
        {{ name }}
      </VTab>
    </VTabs>
    <MyPlanRecipesDialogWithActivatorBtn :day="day" />
    <!--  Tabs content -->
    <VTabsItems v-model="tabValue">
      <VTabItem v-for="{ content } in tabs" :key="content">
        <VSheet class="px-6 py-4">
          <VRow v-show="dailyScheduleRecipes(content).length">
            <VCol
              v-for="{
                _id,
                ingredients,
                makro,
                steps,
                title
              } in dailyScheduleRecipes(content)"
              :key="_id"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
            >
              <MyPlanRecipeCard
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
          <MyPlanNoRecipeChosen
            v-show="!dailyScheduleRecipes(content).length"
          />
        </VSheet>
      </VTabItem>
    </VTabsItems>
  </VCard>
</template>

<script>
export default {
  name: 'ScheduleTabs',
  props: {
    value: {
      type: Number,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  },
  computed: {
    tabValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    dailyScheduleRecipes(day) {
      return this.$auth.user.dietSchedule[day]
    }
  }
}
</script>

<style lang="scss" scoped></style>
