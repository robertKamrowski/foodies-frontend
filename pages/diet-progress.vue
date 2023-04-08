<template>
  <div>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    <ProgressForm class="mb-10" @fetch-progress="fetchProgress" />
    <ProgressChart ref="chart" class="mb-10" />
    <ProgressTable ref="table" class="mb-10" @fetch-progress="fetchProgress" />
  </div>
</template>

<script>
export default {
  name: 'DietProgressPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Progres',
      description:
        'Monitoruj swoje postępy kiedy masz na to ochotę, wpisując odpowiednie dane !'
    }
  }),
  methods: {
    fetchProgress() {
      this.$refs.chart.fetchChartData()
      this.$refs.table.fetchProgressData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
