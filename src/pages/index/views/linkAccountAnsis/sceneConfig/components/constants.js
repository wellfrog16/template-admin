import InputInTable from '@/components/index/common/InputInTable';
export const correlationIndexColumns = [
    {field: 'indexName', label: '指标名称', minWidth: 130},
    {field: 'indexCon', label: '条件', minWidth: 60},
    {field: 'indexValue', label: '值', template: InputInTable},
];
export const createTypeOptions = [
    {label: '相关系数', value: '1', tooltip: '采用皮尔逊相关系数算法，对选定时间范围内客户的交易信息相关性进行计算，筛选出具有相似交易行为的客户群体。'},
    {label: '聚类', value: '2', tooltip: '采用密度聚类算法，根据客户交易行为特征进行聚类计算，筛选出具有近似交易特征的客户群体。'},
    {label: '基本信息', value: '3', tooltip: '筛选出具有相同基本信息的客户群体。'},
    {label: '实控关系', value: '4', tooltip: '筛选出具有相同账户实际控制关系的客户群体。'}
];
export const accountTotalTypeOptions = [
    {label: '按持仓量从大到小', value: '1'},
    {label: '按成交量从大到小', value: '2'},
    {label: '按报单数从大到小', value: '3'}
];
export const accountTotalFrepOptions = [
    {label: '五分钟', value: '4'},
    {label: '一小时', value: '5'},
    {label: '一日', value: '1'},
    {label: '两日', value: '2'},
    {label: '一周', value: '3'},
];
export const sfOptions = [
    {label: '谱聚类', value: '1'},
    {label: '密度聚类', value: '2'},
];
export const defaultConfig = {
    checkedList: ['1', '2', '3', '4'],
    tableData: [],
    acctBargainQtty: '1000', // 账户成交量
    acctBillCnt: '100', // 账户报单量
    acctMakePosQtty: '100', // 账户持仓量
    statAcctCnt: '500', // 统计账户数
    statAcctType: '1', // 统计账户类型
    statFreq: '1', // 统计频度
    almSel: '2', // 算法
    indexPara: {
        '1': '买入成交相关系数>=90% AND 卖出成交相关系数>=90%',
        '3': '(姓名相同 AND 身份证相同) OR (邮编相同 AND 联系地址相同)',
        '4': '(同一投资经理 AND 同一投资顾问) OR (同一权益持有人 AND 同一开户授权人)',
    } // 指数参数
};
export const checkbox = [
    {field: 'acctMakePosQtty', label: '账户持仓量 >=', value: '1', unit: '手'},
    {field: 'acctBargainQtty', label: '账户成交量 >=', value: '2', unit: '手'},
    {field: 'acctBillCnt', label: '账户报单数 >=', value: '3', unit: '笔'},
    {field: 'statAcctCnt', label: '账户数前', value: '4', unit: ''}
];
