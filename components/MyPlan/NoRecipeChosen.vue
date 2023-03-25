<template>
  <VRow class="align-center justify-center">
    <VCol cols="6" lg="4" class="d-none d-md-block">
      <div class="img-container" />
    </VCol>
    <VCol
      cols="12"
      sm="8"
      md="6"
      lg="4"
      class="d-flex flex-column justify-center text-center text-lg-right"
    >
      <h2 class="mb-6">
        <span class="d-block warning--text">Ups !</span>
        <span>
          Wygląda na to, że jeszcze nie masz zaplanowanych posiłków w tym dniu
        </span>
      </h2>

      <h3>
        Dodaj przepisy klikając w powyższy
        <span class="success--text">zielony</span> przycisk
        <VIcon class="green--text">mdi-button-pointer</VIcon>
      </h3>
    </VCol>
  </VRow>
</template>

<script>
export default {
  name: 'NoRecipeChosen'
}
</script>

<style scoped lang="scss">
.img-container {
  min-height: 400px;
  background: url('/my-plan/no-recipe-chosen.jpg') center no-repeat;
  background-size: cover;
}

//
//.content {
//  flex-basis: 50%;
//}
</style>
