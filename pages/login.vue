<template>
  <VContainer class="fill-height">
    <VRow justify="center" align="center">
      <VCol cols="10" sm="8" md="6" lg="5" xl="3">
        <TheLoginCard @onLogin="handleLogin" @onRegister="handleRegister" />
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
    // Login user to the app
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
    },
    async handleRegister(data) {
      try {
        await this.$axios.$post('/auth/register', data)
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
