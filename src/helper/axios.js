import axios from 'axios';
import {Loading, Notification} from 'element-ui';
import config from '@/config';
import store from '../store';
const instance = url => {
    // 配置token到header中
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    accessToken = accessToken || store.state.login.accessToken;
    let instance = axios.create({
        baseURL: url || config.server.api,
        timeout: 200000,
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
            loadingInstancce = Loading.service({
                fullscreen: true,
                spinner: 'el-icon-loading',
                text: '加载中'
            });
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    // response 拦截器
    instance.interceptors.response.use(
        response => {
            loadingInstancce && loadingInstancce.close();
            const {data, config, status, statusText} = response;
            // 需要后端定义一个异常的需要用户登录的状态码来判断，让用户重新登录
            if ((status === 200 || status === 201 || status === 204) && (config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
                if (data.success) {
                    Notification.success({
                        message: data.message
                    });
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
                // router.push({path: '/login'});
            } else if (status !== 200 && status !== 201 && status !== 204) {
                Notification.error({
                    message: statusText
                });
            }
            return data.resData || data;
        },
        error => {
            loadingInstancce && loadingInstancce.close();
            return Promise.reject(error.response);
        }
    );
    return instance;
};
export default instance;
