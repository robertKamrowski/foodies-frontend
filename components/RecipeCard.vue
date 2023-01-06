<template>
  <VCard class="d-flex flex-column fill-height" min-height="380" rounded>
    <VCardTitle class="card-title">
      {{ title }}
    </VCardTitle>
    <VDivider />
    <VCardText>
      <ul>
        <li v-for="(step, index) in steps" :key="index">
          {{ step }}
        </li>
      </ul>
    </VCardText>
    <VDivider />
    <VCardText>
      <ul>
        <li v-for="(ingredient, index) in ingredients" :key="index">
          {{ ingredient }}
        </li>
      </ul>
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn block color="error">Usuń</VBtn>
    </VCardActions>
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
.card-title {
  word-break: break-word;
}
</style>
