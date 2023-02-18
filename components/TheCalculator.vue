<template>
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
        <VTextField
          v-model="calcData.age"
          label="Podaj swój wiek"
          outlined
          color="success"
          dense
          type="number"
          suffix="lat"
          hint="Podaj swój wiek w latach"
          :rules="[rules.required]"
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
          :rules="[rules.required]"
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
          :rules="[rules.required]"
        />
        <VRadioGroup
          v-model="calcData.gender"
          label="Wybierz płeć"
          class="mt-0"
        >
          <VRadio value="female" label="Kobieta" color="success" />
          <VRadio value="male" label="Mężczyzna" color="success" />
        </VRadioGroup>
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
      </VForm>
    </VCardText>
    <VCardActions>
      <VBtn form="calc-form" type="submit" block color="success"> Oblicz</VBtn>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  name: 'TheCalculator',
  data() {
    return {
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
          value: -300
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
        required: (value) => !!value || 'Pole jest wymagane!'
      }
    }
  },
  methods: {
    async onCalc() {
      await this.$refs['calc-form'].validate()
      const { gender, valid, ...userData } = this.calcData
      if (valid) {
        const calories =
          gender === 'male'
            ? this.handleMan(userData)
            : this.handleWoman(userData)
        this.$emit('calculate', valid, calories)
      } else {
        this.$emit('calculate', valid, 0)
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
