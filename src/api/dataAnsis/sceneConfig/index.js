import {post, requestPrefix} from '@/utils/request';
// 场景列表
export const getSceneList = params => {
    return post(`${requestPrefix}/cfgSceneParas`, params || {});
};
// 删除场景
export const deleteScene = sceneId => {
    return post(`${requestPrefix}/deleteCfgScenePara`, {sceneId});
};
// 更新场景
export const updateScene = params => {
    return post(`${requestPrefix}/updateCfgScenePara`, params);
};
// 新增场景
export const createScene = params => {
    return post(`${requestPrefix}/insertCfgScenePara`, params);
};
// 指标列表
export const getTlsIndexTlb = sceneType => {
    return post(`${requestPrefix}/getTlsIndexTlb`, {indexType: sceneType});
};
// 语法检查
export const checkSql = (indexPara, indexType) => {
    return post(`${requestPrefix}/checkSql`, {indexPara: indexPara, indexType: String(indexType)});
};
// 下一步-合并
export const mergeAccountByFile = params => {
    return post(`${requestPrefix}/accountMerge/csv`, params);
};
export const mergeAccount = params => {
    return post(`${requestPrefix}/accountMerge`, params);
};
