// 异常交易分析    172.25.61.13:18003
import {get, post, requestPrefix} from '@/utils/request';

export const getSceneList1 = params => {
    return get(`${requestPrefix}/api-service/test/result/query`, params);
};

export const getSceneList2 = params => {
    return post(`${requestPrefix}`, params);
};
