import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/home.vue"),
  },
  {
    path: "/websocket",
    name: "websocket",
    component: () =>
      import("../views/websocket/websocket-bro.vue"), 
  },
  {
    path: '/echarts',
    name: 'echarts-demo',
    component: () => import("../views/echarts/echarts.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router