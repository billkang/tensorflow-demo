import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../views/home.vue') },
  { path: '/logistic', component: () => import('../views/logistic.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
