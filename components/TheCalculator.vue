<template>
  <div>
    <VCard rounded>
      <VCardTitle>
        Oblicz swoje zapotrzebowanie kaloryczne
        <VIcon class="ml-2 success--text d-inline-block">mdi-nutrition</VIcon>
      </VCardTitle>
      <VCardSubtitle class="mb-3">
        Podaj swoje dane i wybierz dietę dopasowaną do
        <b>Ciebie</b> !
      </VCardSubtitle>
      <VCardText class="pb-0">
        <VForm
          id="calc-form"
          ref="calc-form"
          v-model="calcData.valid"
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
                :rules="[rules.required, rules.maxAge]"
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
                :rules="[rules.required, rules.maxHeight]"
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
                :rules="[rules.required, rules.maxWeight]"
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
    <TheCalculatorResult v-model="modelDialog" :calories="calories" />
  </div>
</template>

<script>
export default {
  name: 'TheCalculator',
  data() {
    return {
      modelDialog: false,
      calories: 0,
      calcData: {
        valid: false,
        age: null,
        height: null,
        weight: null,
        gender: 'female',
        activity: 0,
        goal: 0
      },
      activities: [
        {
          label: 'Siedziący tryb życia',
          value: 0
        },
        {
          label: 'Aktywny - sport 1-2 razy w tygodniu',
          value: 250
        },
        {
          label: 'Bardzo aktywny - sport 3-5 razy w tygodniu',
          value: 500
        }
      ],
      goals: [
        {
          label: 'Chcę zrzucić kilka kilogramów',
          value: -100
        },
        {
          label: 'Chcę utrzymać wagę',
          value: 0
        },
        {
          label: 'Chcę przybrać na wadze',
          value: 300
        }
      ],
      rules: {
        required: (value) => !!value || 'Pole jest wymagane!',
        maxAge: (value) =>
          value <= 100 || 'Wiek musi być mniejszy niż 100 lat!',
        maxHeight: (value) =>
          value <= 220 || 'Wzrost musi być mniejszy niż 220cm!',
        maxWeight: (value) =>
          value <= 300 || 'Waga musi być mniejsza niż 300kg!'
      }
    }
  },
  methods: {
    async onCalc() {
      await this.$refs['calc-form'].validate()
      const { gender, valid, ...userData } = this.calcData
      if (valid) {
        this.calories =
          gender === 'male'
            ? this.handleMan(userData)
            : this.handleWoman(userData)
        this.modelDialog = true
      }
    },
    handleMan({ weight, height, age, activity, goal }) {
      return Math.floor(
        66 + 13.7 * weight + 5 * height - 6.8 * age + activity + goal
      )
    },
    handleWoman({ weight, height, age, activity, goal }) {
      return Math.floor(
        655 + 9.6 * weight + 1.8 * height - 4.7 * age + activity + goal
      )
    }
  }
}
</script>

<style scoped></style>
