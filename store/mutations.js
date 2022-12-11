export default {
  manageAlert: (state, payload) => {
    state.alert = payload
  },
  closeAlert: (state) => {
    state.alert.show = false
  }
}
