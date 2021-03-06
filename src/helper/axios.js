import axios from 'axios';
import {Loading, Notification, MessageBox} from 'element-ui';
import config from '@/config';
import store from '../store';
// import router from '../router';
import Vue from 'vue';
const instance = url => {
    // 配置token到header中
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    accessToken = accessToken || store.state.login.accessToken;
    let instance = axios.create({
        baseURL: url || config.server.api,
        timeout: 0,
        headers: {Authorization: 'Bearer' + accessToken}
    });
    // request 拦截器
    let loadingInstancce = null;
    instance.interceptors.request.use(
        // 全屏遮罩
        config => {
            let accessToken = localStorage.getItem('ACCESS_TOKEN');
            accessToken = accessToken || store.state.login.accessToken;
            config.headers.Authorization = 'Bearer' + accessToken;
            if (location.href.indexOf('login') > -1) { // 登录接口开启全屏loading，其他情况自己添加loading
                loadingInstancce = Loading.service({
                    fullscreen: true,
                    spinner: 'el-icon-loading',
                    text: '加载中'
                });
            }
            return config;
        },
        error => {
            loadingInstancce && loadingInstancce.close();
            Notification.error({
                message: '加载超时'
            });
            return Promise.reject(error);
        }
    );
    // response 拦截器
    instance.interceptors.response.use(
        response => {
            loadingInstancce && loadingInstancce.close();
            const {data, config, status, statusText} = response;
            // 需要后端定义一个异常的需要用户登录的状态码来判断，让用户重新登录
            if ((status === 200 || status === 201 || status === 204) && (config.method === 'get' || config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
                if (data.success) {
                    Notification.success({
                        message: data.message
                    });
                    if (data.message && data.message.indexOf('筛选2000') > -1) {
                        MessageBox.alert('返回结果过大，为提高操作体验，已自动筛选前2000条数据', '警告', {
                            confirmButtonText: '确定'
                        });
                    }
                } else {
                    // 处理登录接口
                    if (data.access_token) {
                        Notification.success({
                            message: '登录成功'
                        });
                    } else {
                        Notification.error({
                            message: data.message
                        });
                    }
                }
            } else if (status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('USER_NAME');
                Vue.prototype.router.replace({
                    path: '/login',
                    query: {redirect: Vue.prototype.router.currentRoute.fullPath}
                });
            } else if (status !== 200 && status !== 201 && status !== 204) {
                Notification.error({
                    message: statusText
                });
            }
            if (data.success || data.access_token || data.code === 200) { // mock
                return data.resData || data;
            } else {
                return Promise.reject(data);
            }
        },
        error => {
            loadingInstancce && loadingInstancce.close();
            if (error.toString().indexOf('Request failed with status code 401') > -1) {
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('USER_NAME');
                Vue.prototype.router.replace({
                    path: '/login',
                    query: {redirect: Vue.prototype.router.currentRoute.fullPath}
                });
            }
            Notification.error({
                message: '加载失败'
            });
            return Promise.reject(error.response);
        }
    );
    return instance;
};
export default instance;
