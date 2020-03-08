<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['0']">
        <template v-for="(item, index) in routesList.children">
          <a-menu-item :key="index" v-if="!item.children">
            <router-link :to="item.path" class="link-to">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </router-link>
          </a-menu-item>

          <a-sub-menu :key="index" v-else>
            <span slot="title"
              ><a-icon :type="item.icon" /> <span>{{ item.name }}</span></span
            >
            <a-menu-item
              :key="`${index}-${ind}`"
              v-for="(val, ind) in item.children"
            >
              <router-link :to="val.path" class="link-to">
                <span>{{ val.name }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header-wrap">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />

          <a-dropdown style="margin-right:60px">
            <a class="ant-dropdown-link" href="#">
              <a-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <a-icon type="down" />
            </a>

            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" class="user-item"
                  ><a-icon type="user" />个人资料</a
                >
              </a-menu-item>
              <a-menu-item>
                <span href="javascript:;" @click="logout" class="user-item"
                  ><a-icon type="logout" />退出</span
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          overflowY: 'scroll'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import route from "@/router/index";
export default {
  data() {
    return {
      collapsed: false,
      routesList: []
    };
  },
  created() {
    this.routesList = route.options.routes.find(item => item.path === "/");
  },
  methods: {
    logout() {
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.link-to {
  display: inline-block;
  width: 100%;
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-item {
  text-align: center;
}
</style>
