import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/Layout.vue";
import Login from "../views/login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/errors/404.vue")
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        icon: "user",
        name: "Home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "/about",
        name: "About",
        icon: "video-camera",
        component: () => import("../views/About.vue")
      },
      {
        path: "/list",
        name: "List",
        icon: "bars",
        component: () => import("../views/list/List.vue")
      },
      {
        path: "/test",
        name: "Test",
        icon: "setting",
        component: () => import("../views/test/Test.vue"),
        children: [
          {
            path: "/test/children",
            name: "Children",
            component: () => import("../views/test/Children.vue")
          },
          {
            path: "/test/list",
            name: "List2",
            component: () => import("../views/list/List.vue")
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
