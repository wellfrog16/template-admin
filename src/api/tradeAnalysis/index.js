// 交易分析
import {post} from '@/utils/request';
const reqEventPre = '/operate/dealanalysis';
const reqUserModulePre = '/operate/userdealanalysis';
/* ---------------------------------- event */
export const queryEventInfo = params => { // 查询异常事件总体信息
    return post(`${reqEventPre}/queryeventinfo`, params);
};
export const queryEventChartData = params => { // 统计图表信息数据
    return post(`${reqEventPre}/queryanalysisinfo`, params);
};
export const updateEventTags = params => { // 修改事件标签
    return post(`${reqEventPre}/mergetag`, params);
};
export const queryEventList = (params = {}) => { // 下拉框异常事件列表（历史记录）
    return post(`${reqEventPre}/queryexceptioneventlist`, params);
};
/* ---------------------------------- user */
export const queryUserList = params => { // 用户列表
    return post(`${reqUserModulePre}/queryuserdealandtaginfo`, params);
};
export const queryStaticInfo = params => { // 静态信息
    return post(`${reqUserModulePre}/queryststicinfo`, params);
};
export const queryTradeInfo = params => { // 交易明细
    return post(`${reqUserModulePre}/querydealdetailinfo`, params);
};
export const queryTagsCloud = params => { // 标签词云
    return post(`${reqUserModulePre}/querytaginfo`, params);
};
export const queryTagsTatistic = params => { // 标签统计
    return post(`${reqUserModulePre}/querytagstatistic`, params);
};
export const queryUserRelation = params => { // 关系图
    return post(`${reqUserModulePre}/queryuserrelationinfo`, params);
};
export const createUnusualReport = params => { // 生成异常分析报告
    return post(`${reqUserModulePre}/generateexceptionanalysis`, params);
};
export const updateUserTags = params => { // 修改用户标签
    return post(`${reqUserModulePre}/mergeusertag`, params);
};
