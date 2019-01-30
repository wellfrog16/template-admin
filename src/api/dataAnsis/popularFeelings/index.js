
// 舆情异常识别
import {post, requestPrefixs} from '@/utils/request';

// export const getKLineChart = params => {
//     return get(`${requestPrefix}/result/query`, params);
// };
// 原油分时图
export const postPetroleumAR1 = params => {
    return post(`${requestPrefixs}/crudeOilPrices`, params);
};
// 美油分时图
export const postPetroleumAR2 = params => {
    return post(`${requestPrefixs}/brentCrude0il`, params);
};
// 原油日K图
export const postPetroleumAR3 = params => {
    return post(`${requestPrefixs}/trade/daily`, params);
};
// 美油日K图图
export const postPetroleumAR4 = params => {
    return post(`${requestPrefixs}/trade/daily`, params);
};
// 分时图--配置表 ----
export const postConfigurationQuery1 = params => {
    return post(`${requestPrefixs}/exceptionCrudeConfig`, params); // 查询
};
export const postConfigurationModification1 = params => {
    return post(`${requestPrefixs}/updateExceptionCrudeConfig`, params); // 修改
};
// 日K图--配置表
export const postConfigurationQuery3 = params => {
    return post(`${requestPrefixs}/settings/query`, params); // 查询
};
export const postConfigurationModification3 = params => {
    return post(`${requestPrefixs}/settings/update`, params); // 修改
};
