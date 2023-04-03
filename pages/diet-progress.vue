<template>
  <div>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <ProgressForm class="mb-10" @fetch-progress="fetchProgress" />
    <ProgressChart ref="chart" />
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
  }),
  methods: {
    fetchProgress() {
      this.$refs.chart.fetchChartData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
