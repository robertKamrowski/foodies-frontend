<template>
  <VRow class="mb-4 align-center">
    <VCol cols="12" lg="9">
      <h1 class="text-h2 font-weight-bold mb-2">
        {{ title }}
      </h1>
      <p class="mb-0">{{ description }}</p>
    </VCol>
    <VCol lg="3">
      <slot />
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
