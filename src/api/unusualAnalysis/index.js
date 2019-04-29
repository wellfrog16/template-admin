
import {post} from '@/utils/request';
// import config from '@/config';
// 获取关系图谱
export const getKnowledgeMap = params => {
    return post('/api-jena/knowledgemap/getmap', params);
};
