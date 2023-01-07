export const state = () => ({
  alert: {
    show: false,
    type: 'error',
    text: 'text z vuex'
  },
  snackbar: {
    show: false,
    text: 'test z vuex',
    type: 'error' // ['error', 'success'] <- available values (color prop in snackbar)
  }
})
