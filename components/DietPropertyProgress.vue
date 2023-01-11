<template>
  <VSheet>
    <div class="d-flex justify-space-between">
      <p class="font-weight-medium mb-1">{{ heading }}</p>
      <VIcon :color="barColor"> {{ icon }}</VIcon>
    </div>
    <VProgressLinear
      :value="progressValue"
      height="25"
      rounded
      :color="barColor"
    >
      <span class="white--text font-weight-bold">
        {{ propDone }} {{ suffix }} / {{ propTotal }} {{ suffix }}
      </span>
    </VProgressLinear>
  </VSheet>
</template>

<script>
export default {
  name: 'DietPropertyProgress',
  props: {
    heading: {
      type: String,
      required: true
    },
    suffix: {
      type: String,
      default: 'g'
    },
    barColor: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      required: true
    },
    propTotal: {
      type: Number,
      required: true
    },
    propDone: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressValue() {
      return ((this.propDone / this.propTotal) * 100).toFixed(2)
    }
  }
}
</script>

<style scoped></style>
