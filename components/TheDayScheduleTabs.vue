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
    <TheRecipesDialogWithActivatorBtn :day="day" />
    <!--  Tabs content -->
    <VTabsItems v-model="tabValue">
      <VTabItem v-for="{ content } in tabs" :key="content">
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
  }
}
</script>

<style lang="scss" scoped></style>
