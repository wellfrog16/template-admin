import {post, requestPrefix} from '@/utils/request';
export const getAccessToken = params => {
    return post(`${requestPrefix}/sys/login`, params);
};
