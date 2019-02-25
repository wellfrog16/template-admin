// 舆情情感分析
import {post, requestPrefixs} from '@/utils/request';
// 舆情分析结论
// 原油舆情情感分析1
export const postpAnalysis = params => {
    return post(`${requestPrefixs}/pAnalysis`, params);
};
// 国际市场原油相关性分析2
// 原油库存3 // 原油库存明细3
export const postCrudeTable = params => {
    return post(`${requestPrefixs}/crudeTable`, params);
};
// 原油库数据4
export const postCrudeDownDetail = params => {
    return post(`${requestPrefixs}/crudeDownDetail`, params);
};
// 原油库存-下载4
export const postCrudeDown = params => {
    return post(`${requestPrefixs}/crudeTable`, params);
};
// 国际环境5
// 舆情列表6
export const postPublicList = params => {
    return post(`${requestPrefixs}/publicList`, params);
};
