<template>
  <div>
    <VBtn
      :disabled="allRecipesSelected"
      block
      color="success"
      tile
      @click="toggleDialog"
    >
      Dodaj przepisy do dnia -
      {{ selectedDailyMeals }} / {{ dailyMeals }}
    </VBtn>
    <VDialog v-model="dialog" max-width="1020" scrollable>
      <VCard>
        <VCardTitle class="mb-2 title">
          <span class="title__text">
            Wszystkie dostępne przepisy z wybranej diety
            {{ selectedDiet('name') }} kalorii
          </span>
          <VBtn
            ref="close"
            class="title__close-btn"
            fab
            icon
            small
            @click="toggleDialog"
          >
            <VIcon> mdi-close</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardSubtitle>
          {{ selectedDiet('description') }}
        </VCardSubtitle>
        <VDivider />
        <VCardText class="pt-4">
          <VRow>
            <VCol
              v-for="{ _id, ingredients, steps, title } in selectedDiet(
                'recipes'
              )"
              :key="_id"
              cols="12"
              lg="4"
              sm="6"
            >
              <MyPlanRecipeCard
                :id="_id"
                :day="day"
                :ingredients="ingredients"
                :show-delete-btn="false"
                :steps="steps"
                :title="title"
                action-type="add"
                card-in-dialog
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
export default {
  name: 'RecipesDialogWithActivatorBtn',
  props: {
    day: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    allRecipesSelected() {
      return this.selectedDailyMeals === this.dailyMeals
    },
    dailyMeals() {
      return this.$auth.user.dietPlan.dailyMeals
    },
    selectedDailyMeals() {
      return this.$auth.user.dietSchedule[this.day].length
    }
  },
  watch: {
    allRecipesSelected(value) {
      value && (this.dialog = false)
    }
  },
  methods: {
    selectedDiet(property) {
      return this.$auth.user.dietPlan[property]
    },
    toggleDialog() {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;

  &__text {
    max-width: 95%;
  }

  &__close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}
</style>
