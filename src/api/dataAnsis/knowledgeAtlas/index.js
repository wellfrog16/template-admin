
// 知识图库接口
import {post, requestPrefix} from '@/utils/request';

export const getddd = params => {
    return post(`${requestPrefix}/fff/rrr`, params || {});
};
