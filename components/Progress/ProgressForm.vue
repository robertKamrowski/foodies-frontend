<template>
  <v-card rounded>
    <v-card-title>
      Sprawdzaj siebie !
      <VIcon class="ml-2 blue--text d-inline-block">
        mdi-chart-line-variant
      </VIcon>
    </v-card-title>
    <v-card-subtitle>
      <p>
        Uzupełnij poniższe pola, aby utworzyć wpis na wykresie i mieć możliwość
        podjerzenia swoich postępów w czasie !
      </p>
    </v-card-subtitle>
    <v-card-text class="pb-0">
      <v-form
        id="progress-form"
        ref="progress-form"
        v-model="valid"
        @submit.prevent="onProgressSubmit"
      >
        <v-row>
          <v-col cols="12" md="6" class="pb-0 pb-md-3">
            <v-text-field
              v-model="progress.weight"
              label="Podaj swoją wagę"
              outlined
              color="success"
              dense
              type="number"
              suffix="kg"
              hint="Podaj swoją wagę w kilogramach"
              :rules="[rules.required, rules.minWeight, rules.maxWeight]"
            />
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="progress.date"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="progress.date"
                  label="Dzień pomiaru"
                  color="success"
                  outlined
                  dense
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :rules="[rules.required]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="progress.date"
                scrollable
                color="success"
                no-title
                locale="pl-PL"
                first-day-of-week="1"
              >
                <v-btn
                  color="success"
                  block
                  @click="$refs.dialog.save(progress.date)"
                >
                  Ok
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="6" class="pt-0 pt-md-3">
            <v-textarea
              v-model="progress.note"
              label="Opcjonalna notatka"
              outlined
              auto-grow
              rows="3"
              color="success"
              hint="W tym miejscu możesz napisać coś dla siebie tak aby np. pamiętać dany dzień w którym dokonano pomiaru. Np. Dzień w którym zjadłem pizze!"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn form="progress-form" type="submit" block color="success">
        Zapisz
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProgressForm',
  data() {
    return {
      valid: false,
      modal: false,
      progress: {
        date: new Date().toISOString().split('T')[0],
        weight: null,
        note: ''
      },
      rules: {
        required: (value) => !!value || 'Pole jest wymagane!',
        maxWeight: (value) =>
          value <= 160 || 'Waga musi być mniejsza niż 160kg!',
        minWeight: (value) => value >= 20 || 'Waga musi być większa niż 20kg!'
      }
    }
  },
  methods: {
    async onProgressSubmit() {
      await this.$refs['progress-form'].validate()
      if (this.valid) {
        console.log('form is valid, time to call backend')
      }
    }
  }
}
</script>

<style></style>
