<template>
  <VApp>
    <VAlert
      v-show="alert.show"
      :type="alert.type"
      transition="scroll-x-transition"
      text
      class="alert"
    >
      {{ alert.text }}
    </VAlert>
    <VMain>
      <Nuxt />
    </VMain>
  </VApp>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import closeAlertOnRedirect from '~/mixins/closeAlertOnRedirect'

Vue.mixin(closeAlertOnRedirect)
export default {
  name: 'DefaultLayout',
  computed: {
    ...mapState(['alert'])
  }
}
</script>

<style scoped lang="scss">
.alert {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
