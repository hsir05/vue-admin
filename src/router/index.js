import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/exception/404.vue")
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        icon: "user",
        name: "Home",
        meta: {
            keepAlive: true,
            auth: ['visitor', 'administrator']
        },
        component: () => import("../views/Home.vue")
      },
      {
        path: "/about",
        name: "About",
        icon: "video-camera",
          meta: {
              keepAlive: true,
              auth: ['visitor', 'administrator']
          },
        component: () => import("../views/About.vue")
      },
      {
        path: "/list",
        name: "List",
        icon: "bars",
          meta: {
              keepAlive: true,
              auth: ['visitor', 'administrator']
          },
        component: () => import("../views/list/List.vue")
      },
      {
        path: "/echarts",
        name: "echarts",
        icon: "bars",
          meta: {
              keepAlive: true,
              auth: ['visitor', 'administrator']
          },
        component: () => import("../views/echarts/Echarts.vue")
      },
      {
        path: "/test",
        name: "Test",
          meta: {
              keepAlive: true,
              auth: ['visitor', 'administrator']
          },
        icon: "setting",
        component: () => import("../views/test/Test.vue"),
        children: [
          {
            path: "/test/children",
            name: "Children",
            meta: {
                keepAlive: true,
                auth: ['visitor', 'administrator']
            },
            component: () => import("../views/test/Children.vue")
          },
          {
            path: "/form",
            meta: {
                keepAlive: true,
                auth: ['visitor', 'administrator']
            },
            name: "Form",
            component: () => import("../views/form/Basic.vue")
          },
          {
            path: "/ueditor",
            meta: {
                keepAlive: true,
                auth: ['visitor', 'administrator']
            },
            name: "Ueditor",
            component: () => import("../views/form/Ueditor.vue")
          },
          {
            path: "/test/list",
            name: "List2",
            meta: {
                keepAlive: true,
                auth: ['visitor', 'administrator']
            },
            component: () => import("../views/list/List.vue")
          },
          {
            path: "/test/404",
            name: "404",
            component: () => import("../views/exception/404.vue")
          },
          {
            path: "/test/403",
            name: "403",
            component: () => import("../views/exception/403.vue")
          },
          {
            path: "/test/500",
            name: "500",
            component: () => import("../views/exception/500.vue")
          }
        ]
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
