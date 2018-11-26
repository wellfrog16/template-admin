
// 异常交易分析    172.25.61.13:18003

// 172.25.61.95 bdsp.redis.com
// 172.25.61.95 bdsp.mysql.com
// 172.25.61.13 bdsp.gateway.com
// 172.25.61.13 bdsp.register.com


import {get, post, requestPrefix} from '@/utils/request';

// export const getImportAccountGroup = params => {
//     return get(`${requestPrefix}/operate/result/query`, params);
// };
//导入账户组
export const postImportAccountGroup = params => {
    return post(`${requestPrefix}/operate/result/query`, params);
};
// 查询
export const postIInquire = params => {
    return post(`${requestPrefix}/operate/sql`, params);
};
// Bar 柱状图
export const postImportAccounBar = params => {
    return post(`${requestPrefix}/operate/exceptionInfo/pic`, params);
};
