export default {
  beforeRouteLeave(to, from, next) {
    this.$store.commit('closeAlert')
    next()
  }
}
