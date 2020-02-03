import Vue from 'vue';
import Router from 'vue-router';
import ElementOverview from './views/ElementOverview.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ElementOverview',
      component: ElementOverview,
      meta: {
        title: '',
      },
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('./views/Privacy.vue'),
      meta: {
        title: 'Privacy policy',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
      meta: {
        title: 'About',
      },
    },
  ],
});