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
  name: 'AllDietsPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Wszystkie diety',
      description: 'Poznaj wszystkie diety'
    }
  })
}
</script>

<style lang="scss" scoped></style>
