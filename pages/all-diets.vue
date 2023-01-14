<template>
  <VContainer>
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
      <p>
        Do Twojego konta nie został przypisany jeszcze żaden plan dietetyczny.
      </p>
      Wybierz jeden z poniższych i dostosuj go do Siebie w zakładce "Mój plan".
      Jeżeli nie wiesz jaką kaloryczność wybrać - przejdź do zakładki
      "Kalkulator kalorii"
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
        <DietCard v-bind="plan" />
      </VCol>
    </VRow>
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
      description: 'Wybieraj dowolne posiłki z diety'
    }
  })
}
</script>

<style lang="scss" scoped></style>
