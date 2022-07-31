import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const route = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/index.vue"),
  },
];

const createRouter = () => new Router({ routes: route });

const router = createRouter();

export default router;
