<template>
  <VContainer>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <VRow>
      <VCol cols="12" md="6" xl="4">
        <TheCalculator />
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
    }
  })
}
</script>

<style lang="scss" scoped></style>
