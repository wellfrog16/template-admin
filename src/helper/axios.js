import axios from 'axios';
import {Loading, Notification, MessageBox} from 'element-ui';
import config from '@/config';
import store from '../store';
// import router from '../router';
import Vue from 'vue';
let CancelToken = axios.CancelToken;
Vue.prototype.__cancels__ = [];
// 移除重复请求
let removePending = ever => {
    for (let p in Vue.prototype.__cancels__) {
        if (Vue.prototype.__cancels__[p].u === ever.url + '&' + ever.method + '&' + JSON.stringify(ever.data)) { // 当当前请求在数组中存在时执行函数体
            Vue.prototype.__cancels__[p].c('abort success'); // 执行取消操作
            Vue.prototype.__cancels__.splice(p, 1); // 把这条记录从数组中移除
        }
    }
};
const instance = url => {
    let baseURL = url || config.server.api;
    // 配置token到header中
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    accessToken = accessToken || store.state.login.accessToken;
    let instance = axios.create({
        baseURL: baseURL,
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
            removePending(config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
            config.cancelToken = new CancelToken(c => { // 在请求拦截器中为每一个请求添加cancelToken，并将cancel方法存入全局数组中保存
                Vue.prototype.__cancels__.push(
                    {
                        u: config.url + '&' + config.method + '&' + JSON.stringify(config.data),
                        c
                    }
                );
            });
            // 公共参数
            let setupUser = localStorage.getItem('USER_NAME');
            // let reqUrl = 'operate' + config.url.split('/operate')[1];
            if (config.method === 'post') {
                config.data = {
                    setupUser,
                    // reqUrl,
                    ...config.data
                };
            } else if (config.method === 'get') {
                config.params = {
                    setupUser,
                    // reqUrl,
                    ...config.params
                };
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
                return data.resData || (data.resData === 0 ? 0 : data);
            } else {
                return Promise.reject(data);
            }
        },
        error => {
            console.error(error);
            loadingInstancce && loadingInstancce.close();
            if (error.toString().indexOf('Request failed with status code 401') > -1) {
                Vue.prototype.$message.error('验证失效，请重新登录');
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('USER_NAME');
                Vue.prototype.router.replace({
                    path: '/login',
                    query: {redirect: Vue.prototype.router.currentRoute.fullPath}
                });
                return;
            }
            if (error.toString().indexOf('abort success') === -1) {
                Notification.error({
                    message: '加载失败'
                });
            }
            return Promise.reject(error.response);
        }
    );
    return instance;
};
export default instance;
