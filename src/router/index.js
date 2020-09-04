import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/Layout.vue";
import Login from "../views/login/Login.vue";
import { getSession, } from '@/utils/store'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      keepAlive: true,
      auth: ["visitor", "administrator"]
    }
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
        icon: "setting",
        name: "dashbord",
        meta: {
          keepAlive: true,
          auth: ["visitor", "administrator"]
        },
        component: () => import("../views/Home.vue")
      },
      {
        path: "/zw",
        name: "知网采集",
        icon: "zhihu",
        meta: {
          keepAlive: true,
          auth: ["visitor", "administrator"]
        },
        component: () => import("../views/zw.vue")
      },
        {
            path: "/wf",
            name: "万方采集",
            icon: "windows",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/wf.vue")
        },
        {
            path: "/cscd",
            name: "CSCD采集",
            icon: "chrome",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/cscd.vue")
        },
        {
            path: "/axs",
            name: "爱学术采集",
            icon: "dribbble",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/axs.vue")
        },
        {
            path: "/ei",
            name: "EI采集",
            icon: "slack",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/ei.vue")
        },
        {
            path: "/webOS",
            name: "web of science",
            icon: "sketch",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/webOS.vue")
        },
        {
            path: "/scopus",
            name: "scopus",
            icon: "yuque",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/scopus.vue")
        },
        {
            path: "/oai",
            name: "OAI",
            icon: "reddit",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/oai.vue")
        },
        {
            path: "/doi",
            name: "Doi全文下载",
            icon: "appstore",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/doi.vue")
        },
        {
            path: "/import",
            name: "数据导出",
            icon: "appstore",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/import.vue")
        },
        {
            path: "/subject",
            name: "专题管理",
            icon: "appstore",
            meta: {
                keepAlive: true,
                auth: ["visitor", "administrator"]
            },
            component: () => import("../views/subject.vue")
        },
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const whiteList = ['/login', '/404', '/test']

router.beforeEach(async (to, from, next) => {
    let hasToken = getSession('access-token')
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单路由不做拦截
            next()
        } else {
            // 无权限路由重定向至登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})

export default router;
