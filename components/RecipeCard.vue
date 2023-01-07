<template>
  <VCard
    :loading="loading"
    class="recipe-card d-flex flex-column fill-height"
    outlined
    rounded
  >
    <VCardTitle class="recipe-card__title">
      {{ title }}
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
    <VSpacer />
    <VCardActions>
      <VSpacer />
      <VBtn
        :color="actionBtnIconColor"
        fab
        outlined
        small
        @click="addOrRemoveRecipeFromSchedule"
      >
        <VIcon>{{ actionBtnIcon }}</VIcon>
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    day: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
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
    },
    actionType: {
      type: String,
      default: 'delete',
      validator: (value) => ['add', 'delete'].includes(value)
    }
  },
  data: () => ({
    loading: false
  }),
  computed: {
    actionBtnIconColor() {
      return this.actionType === 'add' ? 'success' : 'error'
    },
    actionBtnIcon() {
      return this.actionType === 'add' ? 'mdi-plus' : 'mdi-delete'
    }
  },
  methods: {
    async addOrRemoveRecipeFromSchedule() {
      const { actionType, id, day } = this
      const url = `${actionType === 'add' ? 'add-to' : 'remove-from'}-schedule`

      try {
        this.loading = true
        const { message } = await this.$axios.$post(
          url,
          {
            recipeId: id,
            day
          },
          this.$getAuthHeader
        )
        this.loading = false
        await this.$auth.fetchUser()
        this.$store.commit('manageSnackbar', {
          show: true,
          text: message,
          type: 'success'
        })
      } catch ({ response }) {
        this.loading = false
        this.$store.commit('manageSnackbar', {
          show: true,
          text: response.data.message,
          type: 'error'
        })
      }
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
