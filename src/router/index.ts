import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/Layout";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    redirect: "/index",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/Index/Index"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/index",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.PROJECT_NAME + "/"),
  routes,
});

export default router;
