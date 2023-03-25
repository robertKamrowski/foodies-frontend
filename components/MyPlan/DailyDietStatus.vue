<template>
  <VRow>
    <VCol cols="12">
      <VCard class="mb-6">
        <VCardTitle> Dzienny status postępów</VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12" md="3">
              <MyPlanDietPropertyProgress
                :prop-done="dailyCaloriesEaten"
                :prop-total="+$auth.user.dietPlan.name"
                suffix="kcal"
                heading="Kalorie"
                bar-color="deep-orange"
                icon="mdi-numeric"
              />
            </VCol>
            <VCol
              v-for="{
                property,
                heading,
                barColor,
                icon
              } in makroPropertyProgressConfig"
              :key="property"
              cols="12"
              md="3"
            >
              <MyPlanDietPropertyProgress
                :prop-done="getEatenMakroPropValue(`${property}`)"
                :prop-total="$auth.user.dietPlan.dailyMakro[property]"
                :heading="heading"
                :bar-color="barColor"
                :icon="icon"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script>
export default {
  name: 'DailyDietStatus',
  props: {
    day: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      makroPropertyProgressConfig: [
        {
          property: 'protein',
          heading: 'Białko',
          barColor: 'indigo',
          icon: 'mdi-egg'
        },
        {
          property: 'fat',
          heading: 'Tłuszcze',
          barColor: 'orange',
          icon: 'mdi-liquid-spot'
        },
        {
          property: 'carbohydrates',
          heading: 'Węglowodany',
          barColor: 'brown',
          icon: 'mdi-bread-slice'
        }
      ]
    }
  },
  computed: {
    dailyCaloriesEaten() {
      return this.$auth.user.dietSchedule[this.day]
        .filter((recipe) => recipe.isDone)
        .map((recipe) => recipe.kcal)
        .reduce((acc, value) => acc + value, 0)
    }
  },
  methods: {
    getEatenMakroPropValue(property) {
      return this.$auth.user.dietSchedule[this.day]
        .filter((recipe) => recipe.isDone)
        .map((recipe) => recipe.makro[property])
        .reduce((acc, value) => acc + value, 0)
    }
  }
}
</script>

<style lang="scss" scoped></style>
