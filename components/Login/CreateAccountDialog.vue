<template>
  <VDialog :max-width="480" :overlay-opacity="0.1">
    <template #activator="{ on, attrs }">
      <VBtn block outlined v-bind="attrs" color="success" v-on="on">
        Utwórz konto
      </VBtn>
    </template>
    <VCard class="pa-4">
      <VCardTitle class="mb-4">
        <h1 class="text-h3 font-weight-bold">Nowe konto</h1>
      </VCardTitle>
      <VCardSubtitle>
        Wpisz dane aby założyć konto i rozpocząć przygodę z dietą dopasowaną do
        Ciebie !
      </VCardSubtitle>
      <VCardText class="pb-0">
        <VForm id="register-form" @submit.prevent="handleRegister">
          <VTextField
            v-model="registerCredentials.username"
            label="Login"
            color="success"
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
            color="success"
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
        <VBtn
          form="register-form"
          type="submit"
          block
          color="success"
          :loading="loading"
        >
          Utwórz i zaloguj
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LoginCreateAccountDialog',
  data() {
    return {
      loading: false,
      registerCredentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['manageAlert']),
    async handleRegister() {
      this.loading = true
      try {
        await this.$axios.$post('/auth/register', this.registerCredentials)
        await this.$auth.loginWith('local', {
          data: this.registerCredentials
        })
        this.loading = false
      } catch ({ response }) {
        this.manageAlert({
          show: true,
          type: 'error',
          text: response.data.message
        })
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
