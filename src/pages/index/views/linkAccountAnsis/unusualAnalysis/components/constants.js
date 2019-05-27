import clickOnTableCell from '@/components/index/common/clickOnTableCell';
import consensusTags from './consensusTags';
import InputInTable from '@/components/index/common/InputInTable';
import SelectInTable from '@/components/index/common/SelectInTable';
let formatIdtfySubjMatter = item => {
    return String(item.idtfySubjMatter) === '0' ? '内因' : String(item.idtfySubjMatter) === '1' ? '外因' : '';
};
export const correlationIndexColumns = [
    {field: 'indexName', label: '指标名称', minWidth: 130},
    {field: 'indexCon', label: '条件', minWidth: 100, template: SelectInTable},
    {field: 'indexValue', label: '值', template: InputInTable},
];
export const importantConsensusColumns = [
    {label: '舆情标题', field: 'publicOpinTitle', minWidth: 100, template: clickOnTableCell},
    {label: '相似文章统计', field: 'similarArticleStat', minWidth: 150},
    {label: '情感分析', field: 'emotionAnaly', minWidth: 100},
    {label: '关键词', field: 'keyWord', minWidth: 180},
    {label: '标签', field: 'label', minWidth: 180, template: consensusTags},
    {label: '舆情来源', field: 'publicOpinSrc', minWidth: 100}
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
    {label: '品种', field: 'breed', minWidth: 100},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '识别标的', field: 'idtfySubjMatter', minWidth: 100, formatter: formatIdtfySubjMatter},
    {label: '关键词', field: 'keyword', minWidth: 100},
    {label: '时间范围', field: 'dateRange', minWidth: 100},
    {label: '事件描述', field: 'eventDesc', minWidth: 100},
    {label: '用户范围', field: 'userRange', minWidth: 100},
    {label: '影响范围', field: 'influ', minWidth: 100},
    {label: '等级', field: 'lev', minWidth: 100},
];