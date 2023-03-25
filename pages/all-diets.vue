<template>
  <div>
    <PageHeader
      :description="pageHeaderConfig.description"
      :title="pageHeaderConfig.title"
    />
    <VAlert
      v-show="!$auth.user.dietPlan"
      type="info"
      class="mb-6"
      transition="scroll-x-transition"
    >
      <div class="font-weight-medium">
        <p>
          Do Twojego konta nie został przypisany jeszcze żaden plan dietetyczny.
        </p>
        Jeżeli nie wiesz jaką kaloryczność wybrać - przejdź do
        <VBtn to="/calculator" nuxt outlined small> Kalkulator kalorii </VBtn>
      </div>
    </VAlert>
    <VRow>
      <VCol
        v-for="plan in allPlans"
        :key="plan.name"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <AllDietsDietCard v-bind="plan" />
      </VCol>
    </VRow>
  </div>
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
      description:
        'Wybierz elastyczną dietę dostosowaną specjalnie dla Ciebie !'
    }
  })
}
</script>

<style lang="scss" scoped></style>
