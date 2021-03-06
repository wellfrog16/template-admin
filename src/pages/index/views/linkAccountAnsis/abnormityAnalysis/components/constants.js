import custIdColumn from '@/components/index/common/CustIdColumn';
// 初始化表格信息
export const tableColumns1 = [
    {field: 'acctNum', label: '账户组号', width: 150, align: 'center', sortable: true, fixed: true},
    {field: 'custId', label: '客户编号', width: 150, align: 'center', template: custIdColumn, sortable: true, fixed: true},
    {field: 'custName', label: '客户名称', width: 150, align: 'center', sortable: true},
    {field: 'contrCd', label: '合约代码', width: 150, align: 'center', sortable: true},
    // {field: 'acctCurrNetMake', label: '账户组当前净持仓', width: 200, align: 'center', sortable: true},
    // {field: 'acctCurrNetPos', label: '账户当前净持仓', width: 200, align: 'center', sortable: true},
    {field: 'multiBillMakePosQtty', label: '多单持仓量', width: 150, align: 'center', sortable: true},
    {field: 'billMakePosQtty', label: '空单持仓量', width: 150, align: 'center', sortable: true},
    {field: 'statBosomDays', label: '统计区间超仓天数', width: 200, align: 'center', sortable: true},
];
export const tableColumns2 = [
    {field: 'acctNum', label: '账户组号', width: 150, align: 'center', sortable: true, fixed: true},
    {field: 'custId', label: '客户编号', width: 150, align: 'center', template: custIdColumn, sortable: true, fixed: true},
    {field: 'custName', label: '客户名称', width: 150, align: 'center', sortable: true},
    {field: 'contrCd', label: '合约代码', width: 150, align: 'center', sortable: true},
    {field: 'txDt', label: '交易日期', width: 150, align: 'center', sortable: true},
    {field: 'mergeBillCnt', label: '合并撤单次数', width: 150, align: 'center', sortable: true},
    {field: 'acctBillCnt', label: '账户撤单次数', width: 150, align: 'center', sortable: true},
    {field: 'mergeMaAmtBillCnt', label: '合并大额撤单次数', width: 200, align: 'center', sortable: true},
    {field: 'acctMaAmtBillCnt', label: '账户大额撤单次数', width: 200, align: 'center', sortable: true},
];
export const tableColumns3 = [
    {field: 'acctNum', label: '账户组号', width: 150, align: 'center', sortable: true, fixed: true},
    {field: 'custId', label: '客户编号', width: 150, align: 'center', template: custIdColumn, sortable: true, fixed: true},
    {field: 'custName', label: '客户名称', width: 150, align: 'center', sortable: true},
    {field: 'contrCd', label: '合约代码', width: 150, align: 'center', sortable: true},
    {field: 'txDt', label: '交易日期', width: 150, align: 'center', sortable: true},
    {field: 'mergeBargainCnt', label: '合并自成交次数', width: 150, align: 'center', sortable: true},
    {field: 'acctBargainCnt', label: '账户自成交次数', width: 150, align: 'center', sortable: true},
    {field: 'mergeBargainQtty', label: '合并自成交数量', width: 150, align: 'center', sortable: true},
    {field: 'acctBargainQtty', label: '账户自成交数量', width: 150, align: 'center', sortable: true},
];
export const tableColumns = [
    {field: 'acctNum', label: '账户组号', width: 150, align: 'center', fixed: true},
    {field: 'custId', label: '客户编号', width: 150, align: 'center', fixed: true},
    {field: 'custName', label: '客户名称', width: 150, align: 'center'},
    {field: 'memCd', label: '会员代码', width: 150, align: 'center'},
    {field: 'memName', label: '会员名称', width: 150, align: 'center'},
    {field: 'breed', label: '协查品种', width: 150, align: 'center'},
    {field: 'contrCd', label: '合约代码', width: 150, align: 'center'},
    {field: 'supSto', label: '超仓', width: 150, align: 'center'},
    {field: 'cntDate', label: '超仓天数', width: 150, align: 'center'},
    {field: 'positionD', label: '多单持仓量', width: 150, align: 'center'},
    {field: 'positionK', label: '空单持仓量', width: 150, align: 'center'},
    {field: 'freDraBill', label: '频繁报撤单', width: 150, align: 'center'},
    {field: 'bargain', label: '自成交', width: 150, align: 'center'},
];
