import {post, requestPrefix} from '@/utils/request';
// get chart2
export const getChart2Data = params => {
    return post(`${requestPrefix}/historyNetPoolCang`, params || {});
};
// get chart3
export const getChart3Data = params => {
    return post(`${requestPrefix}/historyIsWritten`, params || {}); // ?
};
// get chart4
export const getChart4Data = params => {
    return post(`${requestPrefix}/timeSharingWritten`, params || {}); // ?
};
// getExportResultSet
export const getExportResultSet = params => {
    return post(`${requestPrefix}/getExportResultSet`, params || {});
};
// chart-table2 分页
export const getChartTable2ByPage = params => {
    return post(`${requestPrefix}/historyNetPoolCangPage`, params || {});
};
// 聚类钻取
export const getDetailBy3D = params => {
    return post(`${requestPrefix}/cluster/detail`, params || {});
};