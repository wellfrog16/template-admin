import InputInTable from '@/components/index/common/InputInTable';
export const columnsListAR3 = [
    {field: 'time', label: '公布日期', minWidth: 130, align: 'center'},
    {field: 'content', label: '数据名称', minWidth: 100, align: 'left'},
    {field: 'befores', label: '前值(万桶)', minWidth: 100, align: 'center'},
    {field: 'forecast', label: '预测值(万桶)', minWidth: 130, align: 'center'},
    {field: 'publish', label: '公布值(万桶)', minWidth: 130, align: 'center'},
    {field: 'influence', label: '影响原油', minWidth: 130, align: 'center'}
    // {field: 'a7', label: '阈值范围', minWidth: 130, align: 'center', template: InputInTable} // 用后端说没有值
];
export const columnsListAR4 = [
    {field: 'region', label: '区', minWidth: 100, align: 'left'},
    {field: 'entrepot', label: '交割仓库', minWidth: 140, align: 'center'},
    {field: 'oilOf', label: '油种', minWidth: 140, align: 'center'},
    {field: 'lastWeekStock', label: '上周库存期货', minWidth: 140, align: 'center'},
    {field: 'thisWeekStock', label: '本周库存期货', minWidth: 140, align: 'center'},
    {field: '', label: '理论可用库容量', align: 'center', minWidth: 400,
        children: [
            {label: '上周', field: 'lastWeekAvaStock', minWidth: 140, align: 'center'},
            {label: '本周', field: 'thisWeekAvaStock', minWidth: 140, align: 'center'},
            {label: '本周增减', field: 'regulationAvaStock', minWidth: 140, align: 'center'},
        ]
    },
];
export const columnsListAR5 = [
    {field: 'OPEChot_topic', label: '热点', minWidth: 130, align: 'left'},
    {field: 'page_hits', label: '报道量', minWidth: 100, align: 'center'},
    {field: 'comments_num', label: '评论量', minWidth: 100, align: 'center'},
    // {field: 'pertainOpce', label: '影响量', minWidth: 100, align: 'center'}
];
export const columnsListAR6 = [
    {field: 'publishedTime', label: '日期', minWidth: 100, align: 'center'},
    {field: 'articleSource', label: '来源', minWidth: 70, align: 'center'},
    {field: 'hotTopic', label: '主题', minWidth: 90, align: 'left'},
    {field: 'title', label: '标题', minWidth: 180, align: 'left'},
    {field: 'abstracts', label: '摘要', minWidth: 70, align: 'center'},
    {field: 'pageHits', label: '热度', minWidth: 100, align: 'center'}
];
