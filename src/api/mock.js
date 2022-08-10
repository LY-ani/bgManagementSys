import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';

Mock.mock('/home/getData', homeApi.getStatisticalData);
// 拦截api
Mock.mock('/user/add', 'post', userApi.createUser);
Mock.mock('/user/edit', 'post', userApi.updateUser);
Mock.mock(RegExp('/user/getUser.*'), 'get', userApi.getUserList);
Mock.mock(RegExp('/user/delete.*'), 'get', userApi.deleteUser);
Mock.mock(RegExp('/user/batchDelete.*'), 'get', userApi.batchDelete);
