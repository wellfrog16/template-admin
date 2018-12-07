
// 知识图库接口
import {post, requestPrefix} from '@/utils/request';

// 导入 CSV（文革20）
// export const postCsvData = params => {
//     return post(`${requestPrefix}/customer/combinedscence/csv`, params || {});
// };
// 上传文件；file + body
export const postCsvData = url => {
    return `${config.server.api}${requestPrefix}/${url || 'customer/combinedscence/csv'}?access_token=${localStorage.getItem('ACCESS_TOKEN')}`;
};

// 导入结果集的树状列表(齐宁19)
export const postResultList = params => {
    return post(`${requestPrefix}/getResultList`, params || {});
};
