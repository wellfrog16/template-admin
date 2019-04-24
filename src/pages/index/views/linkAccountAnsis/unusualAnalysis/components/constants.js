import clickOnTableCell from '@/components/index/common/clickOnTableCell';
import consensusTags from './consensusTags';
export const importantConsensusColumns = [
    {label: '舆情标题', field: 'title', minWidth: 100, template: clickOnTableCell},
    {label: '相似文章统计', field: 'count', minWidth: 150},
    {label: '情感分析', field: 'analysis', minWidth: 100},
    {label: '关键词', field: 'keyword', minWidth: 100},
    {label: '标签', field: 'tags', minWidth: 100, template: consensusTags},
    {label: '舆情来源', field: 'source', minWidth: 100}
];
export const reasonReportColumns = [
    {label: '名称', field: 'name', minWidth: 120},
    {label: '现值', field: 'curPrice', minWidth: 100},
    {label: '历史均值', field: 'hisPriceAvg', minWidth: 100},
    {label: '偏离', field: 'deviate', minWidth: 100},
    {label: '影响权重', field: 'influenceEffect', minWidth: 100},
    {label: '属性', field: 'attribute', minWidth: 130},
];
export const unusualReportColumns = [
    {label: '品种', field: 'varieties', minWidth: 100},
    {label: '识别标的', field: 'identifyingTargets', minWidth: 100},
    {label: '关键词', field: 'keywords', minWidth: 100},
    {label: '时间范围', field: 'timeRange', minWidth: 100},
    {label: '事件描述', field: 'thingsDesc', minWidth: 100},
    {label: '用户范围', field: 'userRange', minWidth: 100},
    {label: '影响范围', field: 'influenceRange', minWidth: 100},
    {label: '等级', field: 'grade', minWidth: 100},
];