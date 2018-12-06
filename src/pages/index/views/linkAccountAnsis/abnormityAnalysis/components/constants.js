//初始化表格信息
export const activeNameList = [
    {
        name: '0',
        label: '超仓分析',   // overStoreAnalysis
        tableColumns: [
            {field: "custName", title: "客户名称", width: 150, align: 'center'},
            {field: "contrCd", title: "合约代码", width: 150, align: 'center'},
            {field: "acctCurrNetMake", title: "账户组当前净持仓", width: 200, align: 'center'},
            {field: "acctCurrNetPos", title: "账户当前净持仓", width: 200, align: 'center'},
            {field: "multiBillMakePosQtty", title: "多单持仓量", width: 150, align: 'center'},
            {field: "billMakePosQtty", title: "空单持仓量", width: 150, align: 'center'},
            {field: "statBosomDays", title: "统计区间超仓天数", width: 200, align: 'center'}
        ],
        tableDataList: [],
    }, {
        label: '频繁报撤单分析',  // frequentTrade
        name: '1',
        tableColumns: [
            {field: "custName", title: "客户名称", width: 150, align: 'center'},
            {field: "contrCd", title: "合约代码", width: 150, align: 'center'},
            {field: "txDt", title: "交易日期", width: 150, align: 'center'},
            {field: "mergeBillCnt", title: "合并撤单次数", width: 150, align: 'center'},
            {field: "acctBillCnt", title: "账户撤单次数", width: 150, align: 'center'},
            {field: "mergeMaAmtBillCnt", title: "合并大额撤单次数", width: 200, align: 'center'},
            {field: "acctMaAmtBillCnt", title: "账户大额撤单次数", width: 200, align: 'center'},
        ],
        tableDataList: [],
    }, {
        label: '自成交分析',   // autoTrade
        name: '2',
        tableColumns: [
            {field: "custName", title: "客户名称", width: 150, align: 'center'},
            {field: "contrCd", title: "合约代码", width: 150, align: 'center'},
            {field: "txDt", title: "交易日期", width: 150, align: 'center'},
            {field: "mergeBargainCnt", title: "合并自成交次数", width: 150, align: 'center'},
            {field: "acctBargainCnt", title: "账户自成交次数", width: 150, align: 'center'},
            {field: "mergeBargainQtty", title: "合并自成交数量", width: 150, align: 'center'},
            {field: "acctBargainQtty", title: "账户自成交数量", width: 150, align: 'center'},
        ],
        tableDataList: [],
    }
];
export const tableColumns = [
    {field: "acctNum", label: "账户组号", width: 150, align: 'center'},
    {field: "custId", label: "客户编号", width: 150, align: 'center'},
    {field: "custName", label: "客户名称", width: 150, align: 'center'},
    {field: "memCd", label: "会员代码", width: 150, align: 'center'},
    {field: "memName", label: "会员名称", width: 150, align: 'center'},
    {field: "breed", label: "协查品种", width: 150, align: 'center'},
    {field: "contrCd", label: "合约代码", width: 150, align: 'center'},
    {field: "supSto", label: "超仓", width: 150, align: 'center'},
    {field: "freDraBill", label: "频繁报撤单", width: 150, align: 'center'},
    {field: "bargain", label: "自成交", width: 150, align: 'center'}
];


