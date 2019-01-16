
// 知识图库接口
import {post, requestPrefix} from '@/utils/request';

// 导入结果集的树状列表(齐宁19)
export const postResultList = params => {
    return post(`${requestPrefix}/getResultList`, params || {});
};
// 生成数据
export const regenerateData = params => {
    return post(`${requestPrefix}/customer/combinedscence/regenerate`, params || {});
};
// 生成关系图谱
export const createRelationChart = params => {
    return post(`${requestPrefix}/customer/combinedscence/Spectrum`, params || {});
};
// 点击关系图谱，钻取相关系数
export const fetchBlockData1 = params => {
    return post(`${requestPrefix}/customer/combinedscence/correlation`, params || {});
};
// 点击关系图谱，钻取聚类
export const fetchBlockData3 = params => {
    return post(`${requestPrefix}/3`, params || {});
};
// 点击关系图谱，钻取基本信息
export const fetchBlockData2 = params => {
    return post(`${requestPrefix}/customer/combinedscence/baseInfo`, params || {});
};
// 点击关系图谱，钻取关系人
export const fetchBlockData4 = params => {
    return post(`${requestPrefix}/customer/combinedscence/relativePeople`, params || {});
};