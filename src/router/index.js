import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

// 先把VueRouter原型对象的push replace  方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push方法 第一个参数
VueRouter.prototype.push = function (location, resolve, reject) {
  // console.log(this);//实例
  // 判断如果成功或失败回调已经传了
  if (resolve && reject) {
    // call 调用函数一次  改变this指向
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    // children: [
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import('../views/home/Home.vue'),
    // },
    // {
    //   path: '/mall',
    //   name: 'mall',
    //   component: () => import('../views/mall/Mall.vue'),
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('../views/user/User.vue'),
    // },
    // {
    //   path: '/page1',
    //   name: 'page1',
    //   component: () => import('../views/other/PageOne.vue'),
    // },
    // {
    //   path: '/page2',
    //   name: 'page2',
    //   component: () => import('../views/other/PageTwo.vue'),
    // },
    // ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
