import {post, requestPrefix} from '@/utils/request';
// get chart2
export const getChart2Data = params => {
    return post(`${requestPrefix}/historyNetPoolCang`, params || {});
};
// get chart3
export const getChart3Data = params => {
    return post(`${requestPrefix}/historyIsWritten`, params || {});
};
