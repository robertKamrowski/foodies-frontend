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
  name: 'TipsPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Porady',
      description: 'Poznaj najbardziej super porady'
    }
  })
}
</script>

<style lang="scss" scoped></style>
