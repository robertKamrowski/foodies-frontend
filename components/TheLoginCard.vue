<template>
  <VCard class="pa-4" outlined elevation="24">
    <VCardTitle class="mb-4">
      <h1 class="text-h3 font-weight-bold">Logowanie</h1>
    </VCardTitle>
    <VCardText>
      <VForm id="login-form" @submit.prevent="handleLogin">
        <VTextField
          v-model="credentials.username"
          label="Login"
          append-icon="mdi-login"
          hint="Wpisz login"
          outlined
          rounded
        />
        <VTextField
          v-model="credentials.password"
          type="password"
          label="Hasło"
          append-icon="mdi-key"
          hint="Wpisz hasło"
          outlined
          rounded
          clearable
        />
      </VForm>
    </VCardText>
    <VCardActions>
      <VRow>
        <VCol sm="6">
          <VBtn block outlined> Utwórz konto</VBtn>
        </VCol>
        <VCol sm="6">
          <VBtn form="login-form" type="submit" block> Zaloguj</VBtn>
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  name: 'TheLoginCard',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    handleLogin() {
      console.log(this.credentials)
    },
  },
}
</script>

<style scoped></style>
