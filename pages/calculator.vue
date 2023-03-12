<template>
  <div>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <TheCalculator />
  </div>
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
