import InputInTable from '@/components/index/common/InputInTable';
export const correlationIndexColumns = [
    {field: 'a', label: '指标名称'},
    {field: 'b', label: '条件'},
    {field: 'c', label: '值', template: InputInTable},
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
    {label: '一日', value: '0'},
    {label: '一周', value: '1'},
    {label: '一小时', value: '2'}
];