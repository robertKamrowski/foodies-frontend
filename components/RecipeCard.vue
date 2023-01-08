<template>
  <VCard
    :disabled="isDisabled"
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
    <VCardActions class="px-4">
      <VTooltip top>
        <template #activator="{ on, attrs }">
          <VBtn
            v-if="showDoneBtn"
            :outlined="!isDone"
            color="success"
            fab
            small
            v-bind="attrs"
            @click="onDoneBtnClick"
            v-on="on"
          >
            <VIcon>mdi-check</VIcon>
          </VBtn>
        </template>
        <span>
          {{ doneBtnTooltip }}
        </span>
      </VTooltip>
      <VSpacer />
      <VTooltip top>
        <template #activator="{ on, attrs }">
          <VBtn
            :color="addOrRemoveBtnColor"
            fab
            small
            v-bind="attrs"
            @click="addOrRemoveRecipeFromSchedule"
            v-on="on"
          >
            <VIcon>{{ addOrRemoveBtnIcon }}</VIcon>
          </VBtn>
        </template>
        <span> {{ addOrRemoveBtnTooltip }} </span>
      </VTooltip>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    showDoneBtn: {
      type: Boolean,
      default: false
    },
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
    },
    cardInDialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    isDone: false
  }),
  computed: {
    addOrRemoveBtnColor() {
      return this.actionType === 'add' ? 'success' : 'error'
    },
    addOrRemoveBtnIcon() {
      return this.actionType === 'add' ? 'mdi-plus' : 'mdi-delete'
    },
    addOrRemoveBtnTooltip() {
      return this.actionType === 'add'
        ? 'Dodaj przepis do dnia'
        : 'Usuń przepis z dnia'
    },
    doneBtnTooltip() {
      return `Oznacz przepis jako ${this.isDone ? 'nie' : ''} zrobiony`
    },
    isDisabled() {
      return this.cardInDialog
        ? this.$auth.user.dietSchedule[this.day].some(
            (recipe) => recipe._id === this.id
          )
        : false
    }
  },
  methods: {
    onDoneBtnClick() {
      this.isDone = !this.isDone
    },
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
