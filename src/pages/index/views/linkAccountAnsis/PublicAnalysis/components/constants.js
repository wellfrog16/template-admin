import InputInTable from '@/components/index/common/InputInTable';
export const columnsListAR3 = [
    {field: 'time', label: '公布日期', minWidth: 130, align: 'center'},
    {field: 'content', label: '数据名称', minWidth: 100, align: 'left'},
    {field: 'befores', label: '前值(万桶)', minWidth: 100, align: 'center'},
    {field: 'forecast', label: '预测值(万桶)', minWidth: 130, align: 'center'},
    {field: 'publish', label: '公布值(万桶)', minWidth: 130, align: 'center'},
    {field: 'influence', label: '影响原油', minWidth: 130, align: 'center'},
    {field: 'a7', label: '阈值范围', minWidth: 130, align: 'center', template: InputInTable}
];
export const tableData3 = [
    {
        a1: 'INE原油库存', a2: '2018-12-21', a3: '19000', a4: '15000', a5: '19000', a6: '利空', a7: '14000-18000'
    },
    {
        a1: 'INE原油库存', a2: '2018-12-21', a3: '19000', a4: '15000', a5: '19000', a6: '利空', a7: '14000-18001'
    },
    {
        a1: 'INE原油库存', a2: '2018-12-21', a3: '19000', a4: '15000', a5: '19000', a6: '利空', a7: '14000-18002'
    }
];
export const columnsListAR4 = [
    {field: 'region', label: '区', minWidth: 100, align: 'left'},
    {field: 'entrepot', label: '交割仓库', minWidth: 130, align: 'center'},
    {field: 'oilOf', label: '油种', minWidth: 100, align: 'center'},
    {field: 'lastWeekStock', label: '上周库存期货', minWidth: 130, align: 'center'},
    {field: 'thisWeekStock', label: '本周库存期货', minWidth: 130, align: 'center'},
    {field: 'lastWeekAvaStock', label: '理论可用库容量上周', minWidth: 130, align: 'center'},
    {field: 'thisWeekAvaStock', label: '理论可用库容量本周', minWidth: 130, align: 'center'},
    {field: 'regulationAvaStock', label: '理论可用库容量本周增减', minWidth: 130, align: 'center'}
];
export const tableData4 = [
    {
        a1: '上海', a2: '洋山石油', a3: '', a4: '0', a5: '0', a6: '0', a7: '--', a8: '--', a9: '--'
    },
    {
        a1: '浙江', a2: '中国石化册子岛', a3: '巴士拉轻油', a4: '201000', a5: '201000', a6: '0', a7: '--', a8: '--', a9: '--'
    },
    {
        a1: '浙江', a2: '中油大榭', a3: '', a4: '0', a5: '0', a6: '0', a7: '--', a8: '--', a9: '--'
    },
];
export const columnsListAR5 = [
    {field: 'OPEChot_topic', label: '热点', minWidth: 130, align: 'left'},
    {field: 'page_hits', label: '报道量', minWidth: 100, align: 'center'},
    {field: 'comments_num', label: '评论量', minWidth: 100, align: 'center'},
    // {field: 'pertainOpce', label: '影响量', minWidth: 100, align: 'center'}
];
export const tableData5 = [
    {
        a1: '沙特记者事件', a2: '', a3: '', a4: '利空'
    },
    {
        a1: '特朗普微博', a2: '', a3: '', a4: '利空'
    },
    {
        a1: '沙特减产', a2: '', a3: '', a4: '利空'
    }
];
export const columnsListAR6 = [
    {field: 'publishedTime', label: '日期', minWidth: 100, align: 'center'},
    {field: 'articleSource', label: '来源', minWidth: 70, align: 'center'},
    {field: 'hotTopic', label: '主题', minWidth: 90, align: 'left'},
    {field: 'title', label: '标题', minWidth: 180, align: 'left'},
    {field: 'abstracts', label: '摘要', minWidth: 70, align: 'center'},
    {field: 'pageHits', label: '热度', minWidth: 100, align: 'center'}
];
