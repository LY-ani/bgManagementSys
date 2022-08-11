import Cookie from 'js-cookie';
import Router from 'vue-router';
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home',
      },
    ],
    currentMenu: null,
    menu: [],
  },
  mutations: {
    // 是否收齐左侧菜单栏
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val;
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    removeMenu(state, val) {
      const result = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(result, 1);
    },
    setMenu(state, val) {
      state.menu = [];
      Cookie.set('menu', JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove('menu');
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return;
      }
      const menu = JSON.parse(Cookie.get('menu'));
      state.menu = menu;

      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          // 有子路由
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      console.log(menuArray);
      // 动态添加路由
      menuArray.forEach((item) => {
        router.addRoute('main', item);
      });
    },
  },
};
