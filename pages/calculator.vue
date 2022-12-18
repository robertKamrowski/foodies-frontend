<template>
  <VContainer>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
  </VContainer>
</template>

<script>
export default {
  name: 'CalculatorPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Kalkulator kalorii',
      description: 'Poznaj kalkulator kalorii'
    }
  })
}
</script>

<style lang="scss" scoped></style>
