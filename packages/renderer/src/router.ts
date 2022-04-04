import { createRouter, createWebHashHistory } from 'vue-router';
import Project from '/@/pages/project/index.vue';
import ProjectHome from '/@/pages/project/home.vue';
import Auth from '/@/pages/auth/index.vue';

const routes = [
  { path: '/', name: 'Auth', component: Auth },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
