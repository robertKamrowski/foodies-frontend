<template>
  <VContainer>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <TheCalculator />
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
    }
  })
}
</script>

<style lang="scss" scoped></style>
