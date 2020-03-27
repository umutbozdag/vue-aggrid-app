import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:id",
    name: "Modal",
    component: () => import("../views/SearchVolume.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
