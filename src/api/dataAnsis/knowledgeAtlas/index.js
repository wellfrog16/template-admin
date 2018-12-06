
// 知识图库接口
import {post, requestPrefix} from '@/utils/request';

// 导入 CSV
export const postCsvData = params => {
    return post(`${requestPrefix}/customer/combinedscence/csv`, params || {});
};

