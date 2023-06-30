<template>
  <VCard class="pb-2 d-flex flex-column">
    <div class="image-wrapper">
      <img
        :src="imgSrc"
        alt="Food background image"
        class="image-wrapper__img"
      />
      <VCardTitle class="image-wrapper__title-wrapper font-weight-bold">
        <VChip class="white--text" color="orange">
          {{ dietName }}
        </VChip>
        <VChip
          class="ml-auto font-weight-medium"
          color="green"
          small
          text-color="white"
        >
          {{ dailyMealsMessage }}
        </VChip>
      </VCardTitle>
    </div>
    <!--    </VImg>-->
    <VCardSubtitle>
      {{ description }}
    </VCardSubtitle>
    <VDivider class="mx-4 mt-auto" />
    <VCardTitle> Makroskładniki na dzień</VCardTitle>
    <VCardText>
      <ul>
        <li v-for="[key, value] in dailyMakroArr" :key="key" class="mb-2">
          {{ makroTranslations[key] }}:
          <VChip class="ml-2" color="green" outlined small>
            {{ value }}g
          </VChip>
        </li>
      </ul>
    </VCardText>
    <VCardActions>
      <div class="d-flex flex-column flex-grow-1">
        <VBtn color="green" outlined class="mb-2" @click="onReviewRecipes">
          Sprawdź przepisy
        </VBtn>
        <VBtn
          color="green"
          block
          class="white--text"
          @click="assignDietPlanToUser"
        >
          Wybierz
        </VBtn>
      </div>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  name: 'DietCard',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dailyMeals: {
      type: Number,
      required: true
    },
    dailyMakro: {
      type: Object,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      makroTranslations: {
        fat: 'Tłuszcze',
        protein: 'Białko',
        carbohydrates: 'Węglowodany'
      }
    }
  },
  computed: {
    dailyMakroArr() {
      return Object.entries(this.dailyMakro)
    },
    dietName() {
      return `${this.name}kcal`
    },
    imgSrc() {
      return `/all-diet/thumb_diet_${this.name}.jpg`
    },
    dailyMealsMessage() {
      return `${this.dailyMeals} ${
        this.dailyMeals === 5 ? 'posiłków' : 'posiłki'
      } dziennie`
    }
  },
  methods: {
    async assignDietPlanToUser() {
      const requestBody = {
        dietPlanId: this._id
      }
      try {
        const { message } = await this.$axios.$post(
          '/assign-diet-plan',
          requestBody,
          this.$getAuthHeader
        )
        await this.$auth.fetchUser()
        this.$store.commit('manageAlert', {
          show: true,
          type: 'success',
          text: message
        })
      } catch ({ response }) {
        this.$store.commit('manageAlert', {
          show: true,
          type: 'error',
          text: response.data.message
        })
      }
    },
    onReviewRecipes() {
      this.$emit('onReviewRecipes', this.recipes, this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;

  &__img {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }

  &__title-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
