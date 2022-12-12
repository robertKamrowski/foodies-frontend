<template>
  <VCard class="pa-4" outlined elevation="24">
    <VCardTitle class="mb-4">
      <h1 class="text-h3 font-weight-bold">Logowanie</h1>
    </VCardTitle>
    <VCardText>
      <VForm
        id="login-form"
        @submit.prevent="$emit('onLogin', loginCredentials)"
      >
        <VTextField
          v-model="loginCredentials.username"
          label="Login"
          append-icon="mdi-login"
          hint="Wpisz login"
          outlined
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
          rounded
          dense
          clearable
        />
      </VForm>
    </VCardText>
    <VCardActions>
      <VRow>
        <VCol sm="6">
          <VDialog :max-width="480">
            <template #activator="{ on, attrs }">
              <VBtn block outlined v-bind="attrs" v-on="on"> Utwórz konto</VBtn>
            </template>
            <VCard>
              <VCardTitle class="mb-4">
                <h2 class="text-h4 font-weight-bold">Nowe konto</h2>
              </VCardTitle>
              <VCardText>
                <VForm
                  id="register-form"
                  @submit.prevent="$emit('onRegister', registerCredentials)"
                >
                  <VTextField
                    v-model="registerCredentials.username"
                    label="Login"
                    append-icon="mdi-login"
                    hint="Wpisz login"
                    outlined
                    dense
                    rounded
                  />
                  <VTextField
                    v-model="registerCredentials.password"
                    type="password"
                    label="Hasło"
                    append-icon="mdi-key"
                    hint="Wpisz hasło"
                    outlined
                    rounded
                    dense
                    clearable
                  />
                </VForm>
              </VCardText>
              <VCardActions>
                <VBtn form="register-form" type="submit" block>
                  Utwórz konto
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
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
      registerCredentials: {
        username: '',
        password: ''
      },
      loginCredentials: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped></style>
