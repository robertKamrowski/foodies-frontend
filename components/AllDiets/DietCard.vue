<template>
  <VCard class="pb-2">
    <VImg
      :src="imgSrc"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200"
    >
      <VCardTitle class="white--text">
        {{ dietName }}
        <VChip class="ml-auto" color="green" small text-color="white">
          {{ dailyMealsMessage }}
        </VChip>
      </VCardTitle>
    </VImg>
    <VCardSubtitle>
      {{ description }}
    </VCardSubtitle>
    <VDivider class="mx-4" />
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
      <VBtn block color="green" outlined @click="assignDietPlanToUser">
        Wybierz
      </VBtn>
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
      return `${this.name} kcal`
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
