import InputInTable from '@/components/index/common/InputInTable';
export const correlationIndexColumns = [
    {field: 'a', label: '指标名称'},
    {field: 'b', label: '条件'},
    {field: 'c', label: '值', template: InputInTable},
];
export const createTypeOptions = [
    {label: '相关性分析', value: '0'},
    {label: '相关性分析', value: '1'},
    {label: '相关性分析', value: '2'},
    {label: '相关性分析', value: '3'}
];