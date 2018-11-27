import InputInTable from '@/components/index/common/InputInTable';
export const correlationIndexColumns = [
    {field: 'indexName', label: '指标名称'},
    {field: 'indexCon', label: '条件'},
    {field: 'indexValue', label: '值', template: InputInTable},
];
export const createTypeOptions = [
    {label: '相关性分析', value: '1'},
    {label: '行为分析', value: '2'},
    {label: '地址分析', value: '3'},
    {label: '关系人分析', value: '4'}
];
export const accountTotalTypeOptions = [
    {label: '按持仓量', value: '1'},
    {label: '按成交量', value: '2'},
    {label: '按报单数', value: '3'}
];
export const accountTotalFrepOptions = [
    {label: '一日', value: '1'},
    {label: '一周', value: '2'},
    {label: '一小时', value: '3'}
];
export const sfOptions = [
    {label: '谱聚类', value: '1'},
    {label: '密度聚类', value: '2'},
];
export const defaultConfig = {
    acctBargainQtty: '1000', // 账户成交量
    acctBillCnt: '100', // 账户报单量
    acctMakePosQtty: '100', // 账户持仓量
    statAcctCnt: '500', // 统计账户数
    statAcctType: '1', // 统计账户类型
    statFreq: '1', // 统计频度
    sf: '', // 算法
    indexPara: '买入成交相关系数>=90% AND 卖出成交相关系数>=90%' // 指数参数
};