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
export const uploadFileByBodyInfo = url => {
    return `${config.server.api}${requestPrefix}/${url || 'exceptionInfo/csv'}?access_token=${localStorage.getItem('ACCESS_TOKEN')}`;
};
// 导出csv
export const exportCsv = url => {
    return `${config.server.api}${requestPrefix}/${url || 'export/analysis'}?access_token=${localStorage.getItem('ACCESS_TOKEN')}`;
};
// 导出结果集
export const exportResultSet = params => {
    return post(`${requestPrefix}/getAcctExportResultSet`, params || {});
};
// 通过结果集id查询合约代码，起止日期等
export const getInfoByResultId = resultIds => {
    return post(`${requestPrefix}/getRegeneratingResults`, {resultIds});
};