import Vue from 'vue';
import App from './App.vue';
import createRouter from '@/router';
import createStore from '@/store';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;

export default () => {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    render: h => h(App),
    router,
    store,
  });

  return { app, store, router };
}
