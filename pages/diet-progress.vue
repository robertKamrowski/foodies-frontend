<template>
  <div>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <ProgressForm class="mb-10" />
    <ProgressChart />
  </div>
</template>

<script>
export default {
  name: 'DietProgressPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Progress',
      description:
        'Monitoruj swoje postępy kiedy masz na to ochotę, wpisując odpowiednie dane !'
    }
  })
}
</script>

<style lang="scss" scoped></style>
