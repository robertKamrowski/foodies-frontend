<template>
  <VCard class="mb-6">
    <VCardTitle> Wybrany Plan</VCardTitle>
    <VDivider />
    <VCardTitle> Twoje składniki odżywcze na dziś:</VCardTitle>
  </VCard>
</template>

<script>
export default {
  name: 'TheDailyDietStatus',
  props: {
    day: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
