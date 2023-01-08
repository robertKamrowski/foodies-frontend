<template>
  <VRow class="mb-6">
    <VCol cols="12" md="8">
      <VCard class="mb-6">
        <VCardTitle> Status postępów</VCardTitle>
        <VCardText>
          <VRow>
            <VCol class="d-flex justify-center">
              <VProgressCircular
                :rotate="180"
                :size="100"
                :width="15"
                :value="30"
                color="pink"
              >
                Kalorie
              </VProgressCircular>
            </VCol>
            <VCol class="d-flex justify-center">
              <VProgressCircular
                :rotate="180"
                :size="100"
                :width="15"
                :value="30"
                color="pink"
              >
                Białko
              </VProgressCircular>
            </VCol>
            <VCol class="d-flex justify-center">
              <VProgressCircular
                :rotate="180"
                :size="100"
                :width="15"
                :value="30"
                color="pink"
              >
                Tłuszcze
              </VProgressCircular>
            </VCol>
            <VCol class="d-flex justify-center">
              <VProgressCircular
                :rotate="180"
                :size="100"
                :width="15"
                :value="30"
                color="pink"
              >
                Węglowodany
              </VProgressCircular>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard>
        <VCardTitle class="mb-2">
          Plan
          <VChip color="success" class="ml-2">
            {{ $auth.user.dietPlan.name }} kcal
          </VChip>
        </VCardTitle>
        <VCardSubtitle>{{ $auth.user.dietPlan.description }}</VCardSubtitle>
        <VDivider />
        <VCardTitle> Informacje o dniu</VCardTitle>
        <VCardText>
          <div class="mb-4">
            Liczba posiłków
            <VChip color="success" class="ml-2" small>
              {{ $auth.user.dietPlan.dailyMeals }}
            </VChip>
          </div>
          <div>
            <p class="mb-0">Makroskładniki</p>
            <ul>
              <li v-for="[key, value] in dailyMakroArr" :key="key" class="mb-2">
                {{ makroTranslations[key] }}
                <VChip class="ml-2" color="green" outlined small>
                  {{ value }}g
                </VChip>
              </li>
            </ul>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script>
export default {
  name: 'TheDailyDietStatus',
  props: {
    day: {
      type: String,
      required: true
    }
  },
  data: () => ({
    makroTranslations: {
      fat: 'Tłuszcze',
      protein: 'Białko',
      carbohydrates: 'Węglowodany'
    }
  }),
  computed: {
    dailyMakroArr() {
      return Object.entries(this.$auth.user.dietPlan.dailyMakro)
    }
  }
}
</script>

<style lang="scss" scoped></style>
