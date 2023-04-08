<template>
  <VDialog v-model="modelValue" max-width="560" persistent>
    <VCard :loading="cardLoading">
      <VCardTitle class="mb-2">
        Edycja postępu z dnia
        <span class="font-weight-bold ml-2">
          {{ progressData.date }}
        </span>
      </VCardTitle>
      <VCardSubtitle>
        Jeżeli pomyliłeś się wprowadzając dane, możesz je zaktualizować nowymi
        wartościami!
      </VCardSubtitle>
      <VCardText>
        <VForm
          id="progress-edit-form"
          ref="progress-edit-form"
          v-model="valid"
          @submit.prevent="onFormSubmit"
        >
          <VTextField
            v-model="weight"
            label="Edytuj swoją wagę"
            color="success"
            type="number"
            suffix="kg"
            hint="Podaj swoją wagę w kilogramach"
            :rules="[rules.required, rules.minWeight, rules.maxWeight]"
            outlined
            dense
          />
          <VDialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="progress.date"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <VTextField
                :value="dateUIValue"
                label="Edytuj dzień pomiaru"
                color="success"
                outlined
                dense
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[rules.required]"
              />
            </template>
            <VDatePicker
              v-model="progress.date"
              scrollable
              color="success"
              no-title
              locale="pl-PL"
              first-day-of-week="1"
            >
              <VBtn
                color="success"
                block
                outlined
                @click="$refs.dialog.save(progress.date)"
              >
                Ok
              </VBtn>
            </VDatePicker>
          </VDialog>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn
          type="submit"
          form="progress-edit-form"
          color="success"
          class="flex-grow-1"
          :disabled="!valid"
        >
          Zapisz
        </VBtn>
        <VBtn color="error" outlined @click="close"> Zamknij </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
export default {
  name: 'ProgressEditDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    progressData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modal: false,
      cardLoading: false,
      valid: false,
      progress: {
        date: '',
        weight: null
      },
      rules: {
        required: (value) => !!value || 'Pole jest wymagane!',
        maxWeight: (value) =>
          value <= 160 || 'Waga musi być mniejsza niż 160kg!',
        minWeight: (value) => value >= 20 || 'Waga musi być większa niż 20kg!'
      }
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    weight: {
      get() {
        return this.progressData.weight
      },
      set(weight) {
        this.progress.weight = +weight
      }
    },
    dateUIValue() {
      return this.progress.date ? this.progress.date : this.progressData.date
    }
  },
  methods: {
    async onFormSubmit() {
      await this.$refs['progress-edit-form'].validate()
      if (this.valid) {
        const patchUrl = `/progress/${this.progressData._id}`
        this.cardLoading = true
        const { weight, date } = this.progress
        try {
          const { message } = await this.$axios.$patch(patchUrl, {
            ...(weight ? { weight } : { weight: this.progressData.weight }),
            ...(date ? { date } : { date: this.progressData.date })
          })
          this.$emit('fetch-progress')
          this.$store.commit('manageSnackbar', {
            show: true,
            text: message,
            type: 'success'
          })
          this.cardLoading = false
          this.close()
        } catch ({ response }) {
          this.cardLoading = false
          this.$store.commit('manageSnackbar', {
            show: true,
            text: response.data.message,
            type: 'error'
          })
        }
      }
    },
    close() {
      this.progress = { date: '', weight: null }
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
