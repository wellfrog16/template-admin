import {post, requestPrefix} from '@/utils/request';
// 场景列表
export const getSceneList = params => {
    return post(`${requestPrefix}/operate/cfgSceneParas`, {});
};
// 删除场景
export const deleteScene = sceneId => {
    return post(`${requestPrefix}/operate/deleteCfgScenePara`, {sceneId});
};
// 更新场景
export const updateScene = params => {
    return post(`${requestPrefix}/operate/updateCfgScenePara`, params);
};
// 新增场景
export const createScene = params => {
    return post(`${requestPrefix}/operate/createCfgScenePara`, params);
};
// 结果集列表
export const getTlsResultInfo = () => {
    return post(`${requestPrefix}/operate/getTlsResultInfo`, {});
};