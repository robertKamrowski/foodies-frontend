export default {
  manageAlert: (state, payload) => {
    state.alert = payload
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  },
  closeAlert: (state) => {
    state.alert.show = false
  }
}
