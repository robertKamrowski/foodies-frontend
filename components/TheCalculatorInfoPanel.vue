<template>
  <div>
    {{ calories }}
  </div>
</template>

<script>
export default {
  name: 'TheCalculatorInfoPanel',
  props: {
    calories: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped></style>
