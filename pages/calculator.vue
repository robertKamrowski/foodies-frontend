<template>
  <VContainer>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <VRow>
      <VCol cols="12" md="6" xl="4">
        <TheCalculator @calculate="onCalculate" />
      </VCol>
      <VCol cols="12" md="6" xl="4">
        <TheCalculatorInfoPanel :calories="calories" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
export default {
  name: 'CalculatorPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Kalkulator kalorii',
      description:
        'Uzupełnij pola w kalkulatorze zapotrzebowania kalorycznego i sprawdź ile kalorii musisz zjeść by osiągnąć swój cel!'
    },
    calories: 0
  }),
  methods: {
    onCalculate(valid, calories) {
      valid && (this.calories = calories)
    }
  }
}
</script>

<style lang="scss" scoped></style>
