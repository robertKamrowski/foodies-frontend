export default function ({ $auth, redirect }) {
  if (!$auth.user.dietPlan) {
    redirect('/all-diets')
  }
}
