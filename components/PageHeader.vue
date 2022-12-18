<template>
  <VRow class="mb-4 mb-lg-8">
    <VCol cols="12" lg="6">
      <h1 class="text-h2 font-weight-bold mb-2">
        {{ title }}
      </h1>
      <p>{{ description }}</p>
    </VCol>
  </VRow>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
