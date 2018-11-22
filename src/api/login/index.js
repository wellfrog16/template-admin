import {post} from '@/utils/request';
export const getAccessToken = params => {
    return post('/sys/login', params);
};
