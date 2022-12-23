<template>
  <VContainer>
    <PageHeader
      :description="pageHeaderConfig.description"
      :title="pageHeaderConfig.title"
    />
    {{ allPlans }}
  </VContainer>
</template>

<script>
export default {
  name: 'AllDietsPage',
  layout: 'app',
  async asyncData({ $axios, $getAuthHeader, store }) {
    try {
      const { data: allPlans } = await $axios.$get('/diet-plan', $getAuthHeader)
      return {
        allPlans
      }
    } catch ({ response }) {
      store.commit('manageAlert', {
        show: true,
        type: 'error',
        text: response.data.message
      })
      return {
        allPlans: []
      }
    }
  },
  data: () => ({
    pageHeaderConfig: {
      title: 'Wszystkie diety',
      description: 'Poznaj wszystkie diety'
    }
  })
}
</script>

<style lang="scss" scoped></style>
