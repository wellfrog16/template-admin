import {post, requestPrefix} from '@/utils/request';
export const getSceneList = params => {
    return post(`${requestPrefix}/query/cfgScenePara`, params);
};
export const getSceneListById = params => {
    return post(`${requestPrefix}/query/cfgSceneParas`, params);
};
export const getSceneList2 = params => {
    return post(`${requestPrefix}`, params);
};