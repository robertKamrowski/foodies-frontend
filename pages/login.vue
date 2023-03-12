<template>
  <div class="fill-height d-flex">
    <VRow justify="center" align="center">
      <VCol cols="10" sm="8" md="6" lg="5" xl="3">
        <TheLoginCard class="mb-4" />
        <TheRegisterDialog />
      </VCol>
    </VRow>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style scoped></style>
