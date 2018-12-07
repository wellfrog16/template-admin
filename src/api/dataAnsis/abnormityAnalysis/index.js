
// 异常交易分析
import {post, requestPrefix} from '@/utils/request';

// export const getImportAccountGroup = params => {
//     return get(`${requestPrefix}/result/query`, params);
// };
//导入结果集
// export const postTlsResultInfo = params => {
//     return post(`${requestPrefix}/result/query`, params);
// };
export const postTlsResultInfo = params => {
    return post(`${requestPrefix}/getTlsResultInfo`, {});
};

// 当选择结果集时的生成报告接口
export const postExportType = params => {
    return post(`${requestPrefix}/exceptionInfo/resultSet`, params);
};
// 当选择导入csv时的生成报告接口
export const postExceptionInfo = params => {
    return post(`${requestPrefix}/exceptionInfo/csv`, params);
};
// Bar 柱状图
export const postImportAccounBar = params => {
    return post(`${requestPrefix}/exceptionInfo/pic`, params);
};
// 导出 CSV 的生成报告接口
export const postExportAnalysis = params => {
    return post(`${requestPrefix}/export/analysis`, params);
};
