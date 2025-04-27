import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

// create router takes an object
const router = createRouter({
  history: createWebHistory(import.meta.env.BASEURL),

  routes: [
    // an array of objects
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
