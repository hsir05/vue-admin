<template>
  <div id="app">
    <a-locale-provider :locale="zhCN">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("en");
export default {
  data() {
    return {
      zhCN
    };
  }
};
</script>
<style lang="scss">
#app {
  height: 100vh;
}
</style>
