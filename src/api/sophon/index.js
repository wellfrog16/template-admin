import {post, requestPrefix} from '@/utils/request';
import config from '@/config';
// 获取sophon token 实验平台
export const getLoginSophon = params => {
    return post(`${requestPrefix}/getSophonToken`, params);
};
export const getApiSrc = accessToken => {
    // return `${config.server.api}${requestPrefix}/evaluation/redirectpage?token=${accessToken}&url=${config.server.sophon}`;
    return `${config.server.sophon}`;
};