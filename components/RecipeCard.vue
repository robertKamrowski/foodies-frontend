<template>
  <VCard class="recipe-card d-flex flex-column fill-height" rounded>
    <VCardTitle class="recipe-card__title">
      {{ title }}
      <VBtn class="ml-auto" color="error" outlined fab small>
        <VIcon>mdi-delete</VIcon>
      </VBtn>
    </VCardTitle>
    <VDivider />
    <VCardSubtitle class="font-weight-bold text-decoration-underline">
      Składniki
    </VCardSubtitle>
    <VCardText>
      <ul class="recipe-card__ingredients-list">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          {{ ingredient }}
        </li>
      </ul>
    </VCardText>
    <VCardSubtitle class="font-weight-bold text-decoration-underline">
      Przygotowanie
    </VCardSubtitle>
    <VCardText>
      <ol>
        <li v-for="(step, index) in steps" :key="index">
          {{ step }}
        </li>
      </ol>
    </VCardText>
  </VCard>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    title: {
      type: String,
      required: true
    },
    steps: {
      type: Array,
      required: true
    },
    ingredients: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe-card {
  &__title {
    word-break: break-word;
  }

  &__ingredients-list {
    columns: 2;
  }
}
</style>
