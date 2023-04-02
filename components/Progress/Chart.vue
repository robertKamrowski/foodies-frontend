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
      chartData: {
        labels: ['2023-03-25', '2023-03-25', '2023-03-25', '2023-03-27'],
        datasets: [
          {
            label: 'Waga',
            data: [90, 89, 92, 64]
          }
        ]
      },
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
      },

      mockChartData: [
        {
          date: '2023-03-25',
          weight: 90,
          note: 'First object note'
        },
        {
          date: '2023-03-25',
          weight: 90,
          note: 'First object note'
        },
        {
          date: '2023-03-25',
          weight: 90,
          note: 'First object note'
        }
      ]
    }
  }
}
</script>

<style></style>
