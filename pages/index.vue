<template>
  <div>
    <PageHeader
      :description="pageHeaderConfig.description"
      :title="pageHeaderConfig.title"
    >
      <MyPlanRemovePlanBtn v-if="$auth.user.dietPlan" />
    </PageHeader>
    <template v-if="$auth.user.dietPlan">
      <MyPlanDailyDietStatus :day="activeDay" />
      <MyPlanScheduleTabs v-model="tab" :day="activeDay" :tabs="tabs" />
    </template>
  </div>
</template>

<script>
import checkIfUserHasDietPlan from '~/middleware/checkIfUserHasDietPlan'

export default {
  name: 'MyPlanPage',
  layout: 'app',
  middleware: [checkIfUserHasDietPlan],
  data() {
    return {
      pageHeaderConfig: {
        title: 'Mój plan',
        description: 'Poznaj swój super plan'
      },
      tab: new Date().getDay(),
      tabs: [
        { name: 'Niedziela', content: 'sunday' },
        { name: 'Poniedziałek', content: 'monday' },
        { name: 'Wtorek', content: 'tuesday' },
        { name: 'Środa', content: 'wednesday' },
        { name: 'Czwartek', content: 'thursday' },
        { name: 'Piątek', content: 'friday' },
        { name: 'Sobota', content: 'saturday' }
      ]
    }
  },
  computed: {
    activeDay() {
      return this.tabs[this.tab].content
    }
  }
}
</script>

<style scoped></style>
