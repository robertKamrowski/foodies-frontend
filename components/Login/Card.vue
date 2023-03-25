<template>
  <VCard class="pa-4" outlined elevation="2">
    <VCardTitle class="mb-4">
      <h1 class="text-h3 font-weight-bold">Logowanie</h1>
    </VCardTitle>
    <VCardSubtitle>
      Wpisz dane logowania aby zarządzać swoją dietą !
    </VCardSubtitle>
    <VCardText class="pb-0">
      <VForm id="login-form" @submit.prevent="handleLogin">
        <VTextField
          v-model="loginCredentials.username"
          label="Login"
          append-icon="mdi-login"
          hint="Wpisz login"
          outlined
          color="success"
          dense
          rounded
        />
        <VTextField
          v-model="loginCredentials.password"
          type="password"
          label="Hasło"
          append-icon="mdi-key"
          hint="Wpisz hasło"
          outlined
          color="success"
          rounded
          dense
          clearable
        />
      </VForm>
    </VCardText>
    <VCardActions>
      <VBtn form="login-form" type="submit" block color="success">
        Zaloguj
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LoginCard',
  data() {
    return {
      loginCredentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['manageAlert']),
    async handleLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.loginCredentials
        })
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
