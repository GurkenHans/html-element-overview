import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

const defaultTitle = document.title;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${defaultTitle} | ${to.meta.title}` : defaultTitle;
  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
