<template>
  <VContainer class="fill-height">
    <VRow justify="center" align="center">
      <VCol cols="10" sm="8" md="6" lg="5">
        <TheLoginCard @onLogin="handleLogin" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  methods: {
    ...mapMutations(['manageAlert']),
    async handleLogin(data) {
      try {
        await this.$auth.loginWith('local', { data })
      } catch ({ response }) {
        this.manageAlert({
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
