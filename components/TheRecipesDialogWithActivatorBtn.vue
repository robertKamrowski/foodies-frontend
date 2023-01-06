<template>
  <VBtn :disabled="btnDisabled" class="add-recipe-btn" color="primary">
    Dodaj przepis do dnia
  </VBtn>
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
  }
}
</script>

<style lang="scss" scoped></style>
