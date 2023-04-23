<template>
  <VDialog v-model="modelValue" scrollable max-width="1020" @input="onClose">
    <VCard>
      <VCardTitle class="mb-2">
        Wszystkie przepisy z diety {{ dietName }} kalorii
        <VBtn class="ml-auto" fab icon small @click="onClose">
          <VIcon> mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VDivider />
      <VCardText class="pt-4">
        <VRow>
          <VCol
            v-for="{ _id, ingredients, steps, title } in recipes"
            :key="_id"
            cols="12"
            lg="4"
            sm="6"
          >
            <MyPlanRecipeCard
              :id="_id"
              :title="title"
              :steps="steps"
              :ingredients="ingredients"
              card-in-dialog
              presentational
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script>
export default {
  name: 'AllDietsRecipesDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    dietName: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', !value)
      }
    }
  },
  methods: {
    // Emit this on close
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
