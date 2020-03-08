<template>
  <div class="home">
    <a-card title="Card title" :bordered="true" style="width: 33.3%">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
    <a-card title="Card title" :bordered="true" style="width: 33.3%">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
    <a-card title="Card title" :bordered="true" style="width: 33.3%">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>
<style scoped lang="scss">
.home {
  text-align: center;
  display: flex;
  justify-content: space-between;
}
</style>
