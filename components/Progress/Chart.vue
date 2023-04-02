<template>
  <div class="pb-6">
    <h2 class="mb-2">
      Wykres postępów <VIcon class="ml-1 blue--text">mdi-rocket-launch</VIcon>
    </h2>
    <ClientOnly>
      <LineChart :chart-data="chartData" :chart-options="options" />
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'ProgressChart',
  data() {
    return {
      chartData: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        fill: true,
        tension: 0.2,
        backgroundColor: '#5CB55E87',
        borderColor: '#5CB55E',
        pointBackgroundColor: '#5CB55E87',
        pointRadius: 5,
        pointHoverRadius: 8,
        plugins: {
          tooltip: {
            padding: 10,
            boxPadding: 4
          }
        }
      }
    }
  },
  async mounted() {
    await this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      try {
        const { data } = await this.$axios.$get('/progress-chart')
        this.chartData = data
      } catch ({ response }) {
        this.$store.commit('manageSnackbar', {
          show: true,
          text: response.data.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style></style>
