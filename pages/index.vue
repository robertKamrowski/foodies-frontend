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
  name: 'MyPlanPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Mój plan',
      description: 'Poznaj swój super plan'
    }
  })
}
</script>

<style scoped></style>
