import {post, requestPrefix} from '@/utils/request';
// 获取地区树形列表
export const getAreaTreeList = () => {
    return post(`${requestPrefix}/operate/cfgZoneInfo`, {});
};