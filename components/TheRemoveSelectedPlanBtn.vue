<template>
  <VTooltip top>
    <template #activator="{ on, attrs }">
      <VBtn
        block
        color="error"
        outlined
        v-bind="attrs"
        @click="removeDietPlanFromUser"
        v-on="on"
      >
        Usuń plan
      </VBtn>
    </template>
    <span>
      Usuń aktualny plan i wybierz inny z zakładki "Wszystkie diety"
    </span>
  </VTooltip>
</template>

<script>
export default {
  name: 'TheRemoveSelectedPlanBtn',
  methods: {
    async removeDietPlanFromUser() {
      try {
        await this.$axios.$delete('/remove-diet-plan', this.$getAuthHeader)
        await this.$auth.fetchUser()
        await this.$router.push({
          path: '/all-diets'
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

<style lang="scss" scoped></style>
