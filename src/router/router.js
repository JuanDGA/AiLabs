import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfilesView from "@/views/ProfilesView.vue";
import JapaneseView from "@/views/JapaneseView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/profiles", component: ProfilesView },
  { path: "/japanese", component: JapaneseView },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
