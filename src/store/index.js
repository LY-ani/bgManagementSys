import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab.js';
import userToken from './userToken.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tab,
    userToken,
  },
});
