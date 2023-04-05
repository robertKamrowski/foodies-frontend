<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="12" sm="6">
          <h2>
            Zarządzanie postępami
            <VIcon class="ml-1 blue--text">mdi-cog</VIcon>
          </h2>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
            v-model="search"
            label="Wyszukaj dzień lub wagę"
            color="success"
            append-icon="mdi-magnify"
            clearable
            outlined
            single-line
            hide-details
            dense
          />
        </VCol>
      </VRow>
    </VCardTitle>
    <VDataTable
      sort-by="date"
      :headers="headers"
      :items="progressData"
      :loading="loading"
      :search="search"
      hide-default-footer
      no-results-text="Brak wyników"
    >
      <template #item.actions="{ item }">
        <VBtn icon color="green">
          <v-icon> mdi-pencil </v-icon>
        </VBtn>
        <VBtn icon color="red" @click="removeProgress(item._id)">
          <v-icon> mdi-delete </v-icon>
        </VBtn>
      </template>
    </VDataTable>
  </VCard>
</template>

<script>
export default {
  name: 'ProgressTable',
  data() {
    return {
      search: '',
      loading: false,
      headers: [
        { text: 'Dzień pomiaru', align: 'start', value: 'date' },
        { text: 'Waga', value: 'weight', sortable: true },
        { text: 'Akcja', value: 'actions', sortable: false }
      ],
      progressData: []
    }
  },
  async mounted() {
    await this.fetchProgressData()
  },
  methods: {
    async fetchProgressData() {
      this.loading = true
      try {
        const { data } = await this.$axios.$get('/progress')
        this.progressData = data
        this.loading = false
      } catch ({ response }) {
        this.$store.commit('manageSnackbar', {
          show: true,
          text: response.data.message,
          type: 'error'
        })
        this.loading = false
      }
    },
    async removeProgress(id) {
      this.loading = true
      try {
        const { message } = await this.$axios.$delete(`/progress/${id}`)
        this.$store.commit('manageSnackbar', {
          show: true,
          text: message,
          type: 'success'
        })
        this.$emit('fetch-progress')
      } catch ({ response }) {
        this.$store.commit('manageSnackbar', {
          show: true,
          text: response.data.message,
          type: 'error'
        })
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
