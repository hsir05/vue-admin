<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <router-link to="/" class="link-to">
            <a-icon type="user" />
            <span>home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/about" class="link-to">
            <a-icon type="video-camera" />
            <span>about</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="3">
          <router-link to="/list" class="link-to">
            <a-icon type="video-camera" />
            <span>list</span>
          </router-link>
        </a-menu-item>
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
                <a href="javascript:;" class="user-item"
                  ><a-icon type="logout" />退出</a
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
          minHeight: '280px'
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
      collapsed: false
    };
  },
  created() {
    console.log(route.options.routes);
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
