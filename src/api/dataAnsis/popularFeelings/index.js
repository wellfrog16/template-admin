
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
    return post(`${requestPrefixs}/crudeOilPrices1111`, params);
};
