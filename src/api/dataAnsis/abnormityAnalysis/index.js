
// 异常交易分析
import {post, requestPrefix} from '@/utils/request';

// export const getImportAccountGroup = params => {
//     return get(`${requestPrefix}/result/query`, params);
// };

//  结果集列表
export const postTlsResultInfo = params => {
    return post(`${requestPrefix}/getTlsResultInfo`, {});
};

// 当选择结果集时的生成报告接口
export const postExportType = params => {
    return post(`${requestPrefix}/exceptionInfo/resultSet`, params);
};
// Bar 柱状图
export const postImportAccounBar = params => {
    return post(`${requestPrefix}/exceptionInfo/pic`, params);
};
