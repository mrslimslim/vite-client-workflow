import { createRouter, createWebHashHistory } from 'vue-router';
import Project from '/@/pages/project/index.vue';
import ProjectHome from '/@/pages/project/home.vue';
import ProjectAdd from '/@/pages/project/add.vue';
import Auth from '/@/pages/auth/index.vue';

const routes = [
  { path: '/', name: 'Auth', component: Auth },
  {
    path: '/project',
    name: 'Project',
    component: Project,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: ProjectHome,
      },
      {
        path: 'add',
        name: 'Add',
        component: ProjectAdd,
      },
    ],
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
