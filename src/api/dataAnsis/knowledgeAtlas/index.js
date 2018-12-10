
// 知识图库接口
import {post, requestPrefix} from '@/utils/request';

// 生成报告（知识库图表）（文革7）
export const postRegenerate = params => {
    return post(`${requestPrefix}/customer/combinedscence/regenerate`, params || {});
};

// 导入结果集的树状列表(齐宁19)
export const postResultList = params => {
    return post(`${requestPrefix}/getResultList`, params || {});
};
