<template>
  <v-dialog v-model="modelValue" max-width="440">
    <v-card>
      <v-card-title>
        <span class="text-h5 font-weight-medium">
          Obliczyliśmy Twoje dziennie zapotrzebowanie kaloryczne !
          <v-icon color="green" class="inline-block"> mdi-food-apple </v-icon>
        </span>
      </v-card-title>
      <v-card-subtitle class="mt-1">
        Aby osiągnąć swoje wymarzone cele, wybierz dietę o maksymalnie zbliżonej
        kaloryczności
      </v-card-subtitle>
      <v-card-text class="d-flex align-center justify-center">
        <span class="text-h1 font-weight-bold green--text">
          {{ calories }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/all-diets" nuxt outlined block color="green">
          Przejdź do wyboru diety
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'TheCalculatorResult',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    calories: {
      type: Number,
      required: true
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
    }
  },
  methods: {
    onCloseClick() {
      this.$emit('input', !this.modelValue)
    }
  }
}
</script>

<style></style>
