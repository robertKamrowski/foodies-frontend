<template>
  <VContainer>
    <PageHeader
      :description="pageHeaderConfig.description"
      :title="pageHeaderConfig.title"
    >
      <TheRemoveSelectedPlanBtn v-if="$auth.user.dietPlan" />
    </PageHeader>
    <template v-if="$auth.user.dietPlan">
      <TheDailyDietStatus :day="day" />
      <TheDayScheduleTabs @day-change="handleDayChange" />
    </template>
  </VContainer>
</template>

<script>
export default {
  name: 'MyPlanPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Mój plan',
      description: 'Poznaj swój super plan'
    },
    day: ''
  }),
  methods: {
    handleDayChange(value) {
      this.day = value
    }
  }
}
</script>

<style scoped></style>
