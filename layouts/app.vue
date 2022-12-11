<template>
  <VApp>
    <VAppBar />
    <VNavigationDrawer />
    <VMain>
      <VContainer>
        <Nuxt />
      </VContainer>
    </VMain>
  </VApp>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>

<style scoped></style>
