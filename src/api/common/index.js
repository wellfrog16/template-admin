import {post, requestPrefix} from '@/utils/request';
import config from '@/config';
// 获取地区树形列表
export const getAreaTreeList = () => {
    return post(`${requestPrefix}/cfgZoneInfo`, {});
};
// 导入csv，输出账户号list
export const getAccountsByUploadFile = () => {
    return `${config.server.api}${requestPrefix}/uploadFiles?access_token=${localStorage.getItem('ACCESS_TOKEN')}`;
};
// 结果集列表
export const getTlsResultInfo = () => {
    return post(`${requestPrefix}/getTlsResultInfo`, {});
};
// 上传文件；file + body
export const uploadFileByBodyInfo = () => {
    return `${config.server.api}${requestPrefix}/sql?access_token=${localStorage.getItem('ACCESS_TOKEN')}`;
};