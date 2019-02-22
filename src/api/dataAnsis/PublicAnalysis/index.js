// 舆情情感分析
import {post, requestPrefixs} from '@/utils/request';
// 舆情分析结论
// 原油舆情情感分析
export const postpAnalysis = params => {
    return post(`${requestPrefixs}/pAnalysis`, params);
};
// 国际市场原油相关性分析
// 原油库存
export const postCrudeTable = params => {
    return post(`${requestPrefixs}/crudeTable`, params);
};
// 原油库存-下载
export const postCrudeDown = params => {
    return post(`${requestPrefixs}/crudeTable`, params);
};
// 原油库存
// 国际环境
// 舆情列表
export const postPublicList = params => {
    return post(`${requestPrefixs}/publicList`, params);
};
