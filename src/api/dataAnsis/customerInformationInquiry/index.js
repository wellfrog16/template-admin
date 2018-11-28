
// 客户信息查询
import {post, requestPrefix} from '@/utils/request';

// export const getImportAccountGroup = params => {
//     return get(`${requestPrefix}/result/query`, params);
// };
// 客户地址查询(生成报告接口)
export const postCustomerAddress = params => {
    return post(`${requestPrefix}/result/query`, params);
};
// 客户交易信息查询(生成报告接口)
export const postCustomerTransactions = params => {
    return post(`${requestPrefix}/exceptionInfo/resultSet`, params);
};
// 精确信息查询(生成报告接口)
export const postPreciseInformation = params => {
    return post(`${requestPrefix}/exceptionInfo/csv`, params);
};
// 模糊地址查询(生成报告接口)
export const postFuzzyAddress = params => {
    return post(`${requestPrefix}/exceptionInfo/pic`, params);
};
