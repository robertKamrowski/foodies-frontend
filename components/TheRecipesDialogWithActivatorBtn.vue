<template>
  <VDialog max-width="1020" scrollable transition="dialog-bottom-transition">
    <template #activator="{ on, attrs }">
      <VBtn
        :disabled="btnDisabled"
        block
        color="primary"
        tile
        v-bind="attrs"
        v-on="on"
      >
        Dodaj przepisy do dnia
      </VBtn>
    </template>
    <template #default="dialog">
      <VCard>
        <VCardTitle class="mb-2 title">
          <span class="title__text">
            Wszystkie dostępne przepisy z wybranej diety -
            {{ selectedDiet('name') }} kcal
          </span>
          <VBtn
            class="title__close-btn"
            fab
            icon
            small
            @click="dialog.value = false"
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
              v-for="recipe in selectedDiet('recipes')"
              :key="recipe._id"
              cols="12"
              lg="4"
              sm="6"
            >
              <RecipeCard
                :id="recipe._id"
                :ingredients="recipe.ingredients"
                :show-delete-btn="false"
                :steps="recipe.steps"
                :title="recipe.title"
                action-type="add"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>

<script>
export default {
  name: 'TheAddRecipeBtn',
  props: {
    selectedMeals: {
      type: Number,
      required: true
    }
  },
  computed: {
    btnDisabled() {
      return this.selectedMeals === this.$auth.user.dietPlan.dailyMeals
    }
  },
  methods: {
    selectedDiet(property) {
      return this.$auth.user.dietPlan[property]
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
