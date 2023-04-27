<template>
  <div>
    <VCard rounded :loading="cardLoading">
      <VCardTitle>
        Oblicz swoje zapotrzebowanie kaloryczne
        <VIcon class="ml-2 success--text d-inline-block">mdi-nutrition</VIcon>
      </VCardTitle>
      <VCardSubtitle>
        <p>
          Podaj swoje dane i wybierz dietę dopasowaną do
          <b>Ciebie</b> !
        </p>
      </VCardSubtitle>
      <VCardText class="pb-0">
        <VForm
          id="calc-form"
          ref="calc-form"
          v-model="valid"
          @submit.prevent="onCalc"
        >
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="calcData.age"
                label="Podaj swój wiek"
                outlined
                color="success"
                dense
                type="number"
                suffix="lat"
                hint="Podaj swój wiek w latach"
                :rules="[rules.required, rules.minAge, rules.maxAge]"
              />
              <VTextField
                v-model="calcData.height"
                label="Podaj swój wzrost"
                outlined
                color="success"
                dense
                type="number"
                suffix="cm"
                hint="Podaj swój wzrost w centymetrach"
                :rules="[rules.required, rules.minHeight, rules.maxHeight]"
              />
              <VTextField
                v-model="calcData.weight"
                label="Podaj swoją wagę"
                outlined
                color="success"
                dense
                type="number"
                suffix="kg"
                hint="Podaj swoją wagę w kilogramach"
                :rules="[rules.required, rules.minWeight, rules.maxWeight]"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VSelect
                v-model="calcData.activity"
                :items="activities"
                outlined
                dense
                color="success"
                item-text="label"
                item-value="value"
                label="Wybierz poziom aktywności"
                persistent-hint
                item-color="success"
              />
              <VSelect
                v-model="calcData.goal"
                :items="goals"
                outlined
                dense
                color="success"
                item-text="label"
                item-value="value"
                label="Wybierz swój cel"
                persistent-hint
                item-color="success"
              />
              <VRadioGroup
                v-model="calcData.gender"
                label="Wybierz płeć"
                row
                class="mt-0"
              >
                <VRadio value="female" label="Kobieta" color="success" />
                <VRadio value="male" label="Mężczyzna" color="success" />
              </VRadioGroup>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn form="calc-form" type="submit" block color="success">Oblicz</VBtn>
      </VCardActions>
    </VCard>
    <CalculatorResultDialog v-model="modelDialog" :calories="calories" />
  </div>
</template>

<script>
export default {
  name: 'TheCalculator',
  data() {
    return {
      modelDialog: false,
      calories: 0,
      valid: false,
      cardLoading: false,
      calcData: {
        age: null,
        height: null,
        weight: null,
        gender: 'female',
        activity: 'level_1',
        goal: 'maintain weight'
      },
      activities: [
        {
          label: 'Siedziący tryb życia, brak aktywności fizycznej',
          value: 'level_1'
        },
        {
          label: 'Ćwiczenia 1-3 razy w tygodniu',
          value: 'level_2'
        },
        {
          label: 'Ćwiczenia 4-5 razy w tygodniu',
          value: 'level_3'
        },
        {
          label:
            'Codzienne ćwiczenia lub intensywny trening 3-4 razy w tygodniu',
          value: 'level_4'
        },
        {
          label: 'Intensywny trening 6-7 razy w tygodniu',
          value: 'level_5'
        },
        {
          label: 'Bardzo intensywny trening codziennie lub praca fizyczna',
          value: 'level_6'
        }
      ],
      goals: [
        {
          label: 'Chcę zrzucić kilka kilogramów',
          value: 'Mild weight loss'
        },
        {
          label: 'Chcę utrzymać wagę',
          value: 'maintain weight'
        },
        {
          label: 'Chcę przybrać na wadze',
          value: 'Mild weight gain'
        }
      ],
      rules: {
        required: (value) => !!value || 'Pole jest wymagane!',
        minAge: (value) => value > 0 || 'Wiek musi być większy niż 0!',
        maxAge: (value) => value <= 80 || 'Wiek musi być mniejszy niż 80 lat!',
        minHeight: (value) =>
          value >= 130 || 'Wzrost musi być większy niż 130cm!',
        maxHeight: (value) =>
          value <= 230 || 'Wzrost musi być mniejszy niż 230cm!',
        maxWeight: (value) =>
          value <= 160 || 'Waga musi być mniejsza niż 160kg!',
        minWeight: (value) => value >= 40 || 'Waga musi być większa niż 40kg!'
      }
    }
  },
  methods: {
    async onCalc() {
      await this.$refs['calc-form'].validate()
      if (this.valid) {
        const { age, gender, height, weight, activity, goal } = this.calcData
        const apiUrl = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activity}`

        try {
          this.cardLoading = true
          const {
            data: { goals }
          } = await this.$axios.$get(apiUrl, {
            headers: {
              'X-RapidAPI-Host': this.$config.rapidAPIHost,
              'X-RapidAPI-Key': this.$config.rapidAPIKey
            }
          })
          this.calories = this.roundValue(
            goal === 'maintain weight' ? goals[goal] : goals[goal].calory
          )
          this.cardLoading = false
          this.modelDialog = true
        } catch (e) {
          this.$store.commit('manageAlert', {
            show: true,
            type: 'error',
            text: 'Wystąpił nieoczekiwany błąd podczas obliczania zapotrzebowania, spróbuj ponownie później'
          })
          this.cardLoading = false
          this.modelDialog = false
        }
      }
    },
    roundValue(value) {
      return Math.round(value)
    }
  }
}
</script>

<style scoped></style>
