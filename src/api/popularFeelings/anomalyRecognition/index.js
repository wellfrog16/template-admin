
// 舆情
import {post, requestPrefixs} from '@/utils/request';

// export const getKLineChart = params => {
//     return get(`${requestPrefix}/result/query`, params);
// };

//  舆情-K线图
export const postKLineChart = params => {
    return post(`${requestPrefixs}/trade/daily`, params);
};
export const postCrudeOilPrices = params => {
    return post(`${requestPrefixs}/crudeOilPrices`, params);
};
