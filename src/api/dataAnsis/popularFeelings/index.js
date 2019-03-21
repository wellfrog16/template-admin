
// 舆情异常识别
import {post, requestPrefixs} from '@/utils/request';

// 原油分时图
export const postPetroleumAR1 = params => {
    return post(`${requestPrefixs}/crudeOilPrices`, params);
};
// 美油分时图
export const postPetroleumAR2 = params => {
    return post(`${requestPrefixs}/brentCrude0il`, params);
};
// 原油日K图
export const postPetroleumAR3 = params => {
    return post(`${requestPrefixs}/trade/daily`, params);
};
// 美油日K图
export const postPetroleumAR4 = params => {
    return post(`${requestPrefixs}/nyDayKList`, params);
};
// .....................................................
// 原油日分时图1--配置表
export const postConfigurationQuery1 = params => {
    return post(`${requestPrefixs}/exceptionCrudeConfig`, params); // 查询
};
// 原油日K图3--配置表
export const postConfigurationQuery3 = params => {
    return post(`${requestPrefixs}/settings/query`, params); // 查询
};
// 美油日分时图2--配置表;  美油日K图4- 他比证券配置表
export const postThanSec = params => {
    return post(`${requestPrefixs}/thanSec`, params);
};
// 美油日分时图(2,4)--修改 - 配置表
export const postUpdateConfig = params => {
    return post(`${requestPrefixs}/updateExceptionCrudeConfig`, params); // 修改
};
// 原油日K图(1,3)--修改 - 配置表
export const postUpdate = params => {
    return post(`${requestPrefixs}/settings/update`, params); // 修改
};
