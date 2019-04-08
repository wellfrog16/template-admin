import {post, requestPrefix} from '@/utils/request';
export const getCustomList = params => {
    return post(`${requestPrefix}/evaluation/querycustomlist`, params);
};
export const getEvaluationHistoryDeal = params => { // 实验平台历史成交图
    return post(`${requestPrefix}/evaluation/evaluationhistorydeal`, params);
};
export const getEvaluationHistoryDealDetail = params => { // 实验平台分时图
    return post(`${requestPrefix}/evaluation/evaluation/evaluationtimedealdetail`, params);
};