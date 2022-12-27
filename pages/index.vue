<template>
  <VContainer>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
    {{ $auth.user }}
    <VBtn v-if="$auth.user.dietPlan" @click="removeDietPlanFromUser">
      Wypisz się z planu
    </VBtn>
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
  }),
  methods: {
    async removeDietPlanFromUser() {
      try {
        const { message } = await this.$axios.$delete(
          '/remove-diet-plan',
          this.$getAuthHeader
        )
        await this.$auth.fetchUser()
        this.$store.commit('manageAlert', {
          show: true,
          type: 'success',
          text: message
        })
      } catch ({ response }) {
        this.$store.commit('manageAlert', {
          show: true,
          type: 'error',
          text: response.data.message
        })
      }
    }
  }
}
</script>

<style scoped></style>
