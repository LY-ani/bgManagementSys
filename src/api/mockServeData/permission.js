import Mock from 'mockjs';
export default {
  getMenu: (config) => {
    console.log(config);
    const { username, password } = JSON.parse(config.body);
    // 判断用户名是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === '123') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/Home.vue',
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/Mall.vue',
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/User.vue',
            },
            {
              path: '/other',
              label: '其他',
              icon: 'location.vue',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'other/PageOne.vue',
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'other/PageTwo.vue',
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功',
        },
      };
    } else if (username === 'lyy' && password === '123') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/Home.vue',
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/Mall.vue',
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功',
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: '用户名或密码错误',
        },
      };
    }
  },
};
