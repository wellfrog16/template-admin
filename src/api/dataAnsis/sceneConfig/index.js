import {get, post, requestPrefix} from '@/utils/request';
export const getSceneList1 = params => {
    return get(`${requestPrefix}`, params);
};
export const getSceneList2 = params => {
    return post(`${requestPrefix}`, params);
};