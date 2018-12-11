import instance from '@/helper/axios';

const axios = instance('');
// 前缀
export const requestPrefix = '/api-service/operate';
/**
 * 封装的get请求
 * 返回结果层级为value层
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @return {function} function
 */
export function get(url, params) {
    url = encodeURI(url);
    return axios.get(url, {params});
}

/**
 * 封装的post请求
 * 返回结果层级为value层
 *
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @return {function} function
 */
export function post(url, params) {
    url = encodeURI(url);
    return axios.post(url, params);
}
