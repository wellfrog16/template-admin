import {post, requestPrefix} from '@/utils/request';
import config from '@/config';
// 获取地区树形列表
export const getAreaTreeList = () => {
    return post(`${requestPrefix}/operate/cfgZoneInfo`, {});
};
// 导入csv，输出账户号list
export const getAccountsByUploadFile = () => {
    return `${config.server.api}${requestPrefix}/operate/uploadFiles`;
};
// 结果集列表
export const getTlsResultInfo = () => {
    return post(`${requestPrefix}/operate/getTlsResultInfo`, {});
};