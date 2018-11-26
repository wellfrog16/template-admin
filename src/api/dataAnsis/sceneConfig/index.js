import {post, requestPrefix} from '@/utils/request';
// 场景列表
export const getSceneList = params => {
    return post(`${requestPrefix}/operate/cfgSceneParas`, params || {});
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
    return post(`${requestPrefix}/operate/insertCfgScenePara`, params);
};
// 指标列表
export const getTlsIndexTlb = sceneType => {
    return post(`${requestPrefix}/operate/getTlsIndexTlb`, {indexType: sceneType});
};
// 语法检查
export const checkSql = indexPara => {
    return post(`${requestPrefix}/operate/checkSql`, {indexPara});
};
// 下一步-合并
export const mergeAccount = params => {
    return post(`${requestPrefix}/operate/accountMerge`, params);
};