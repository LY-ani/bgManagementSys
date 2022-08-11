import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './api/mock.js';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.userToken.token;
  console.log(token);
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    next({ name: 'home' });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.commit('addMenu', router);
  },
}).$mount('#app');
