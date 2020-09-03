import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { Base64 } from 'js-base64';
import { Modal, notification } from "ant-design-vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import settings from '@/settings';
import { getSession } from './store'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 9000 // 请求超时时间
});

const err = error => {
  if (error.response) { 
    let data = error.response.data;
      let token = getSession('access-token') 
    switch (error.response.status) {
      case 403:
        notification.error({
          message: "系统提示",
          description: "拒绝访问",
          duration: 4
        });
        break;
      case 500:
        if (token && data.message == "Token失效，请重新登录") {
          Modal.error({
            title: "登录已过期",
            content: "很抱歉，登录已过期，请重新登录",
            okText: "重新登录",
            mask: false,
            onOk: () => {
              store.dispatch("Logout").then(() => {
                Vue.ls.remove(ACCESS_TOKEN);
                window.location.reload();
              });
            }
          });
        }
        break;
      case 404:
        notification.error({
          message: "系统提示",
          description: "很抱歉，资源未找到!",
          duration: 4
        });
        break;
      case 504:
        notification.error({ message: "系统提示", description: "网络超时" });
        break;
      case 401:
        notification.error({
          message: "系统提示",
          description: "未授权，请重新登录",
          duration: 4
        });
        if (token) {
          store.dispatch("Logout").then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
        }
        break;
      default:
        notification.error({
          message: "系统提示",
          description: data.message,
          duration: 4
        });
        break;
    }
  }
  return Promise.reject(error);
};

service.interceptors.request.use(
  config => {
        config.headers['Authorization'] = `Basic ${Base64.encode(`${settings.clientId}:${settings.clientSecret}`)}`;
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.common['Blade-Auth'] = 'bearer ' + token.content
        } 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(response => {
  return response.data;
}, err);

export default service
