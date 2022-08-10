import axios from 'axios';
import config from '../config';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro;

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {},
    };
    return config;
  }

  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在发送请求前做些什么
        return config;
      },
      (err) => {
        // 对请求错误做些什么
        console.log(err, 'request error');
        return Promise.reject(err);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // 对响应数据做处理
        return res;
      },
      (err) => {
        // 对响应错误做什么
        console.log(err, 'response error');
        return Promise.reject(err);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = { ...this.getInsideConfig(), ...options };
    this.interceptors(instance);
    return instance(options);
  }
}

export default new HttpRequest(baseUrl);
