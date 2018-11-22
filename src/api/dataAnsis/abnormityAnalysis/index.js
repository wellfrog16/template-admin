
// 异常交易分析    172.25.61.13:18003

// 172.25.61.95 bdsp.redis.com
// 172.25.61.95 bdsp.mysql.com
// 172.25.61.13 bdsp.gateway.com
// 172.25.61.13 bdsp.register.com


import {get, post, requestPrefix} from '@/utils/request';
//导入账户组
export const getImportAccountGroup = params => {
    return get(`${requestPrefix}/test/result/query`, params);
};

export const postImportAccountGroup = params => {
    return post(`${requestPrefix}/test/result/query`, params);
};
