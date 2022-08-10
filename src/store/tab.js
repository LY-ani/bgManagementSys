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
  },
};