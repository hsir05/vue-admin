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
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
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
