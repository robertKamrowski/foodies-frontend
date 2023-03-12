<template>
  <div>
    <PageHeader
      :title="pageHeaderConfig.title"
      :description="pageHeaderConfig.description"
    />
  </div>
</template>

<script>
export default {
  name: 'ShoppingListPage',
  layout: 'app',
  data: () => ({
    pageHeaderConfig: {
      title: 'Lista zakupów',
      description: 'Zrób listę zakupów'
    }
  })
}
</script>

<style lang="scss" scoped></style>
