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
        tableDataList: [
            // {
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00008",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80005147",
            //     custName: '',
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00008",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80008229",
            //     custName: '',
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00008",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80005237",
            //     custName: null,
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00003",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80005146",
            //     custName: '',
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00003",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80008229",
            //     custName: '',
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00003",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80005257",
            //     custName: null,
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // }
        ],
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
        tableDataList: [
            // {
            //     acctBillCnt: 104,
            //     acctMaAmtBillCnt: 51,
            //     acctNum: "XG00005",
            //     contrCd: "cu1712",
            //     custId: "80015120",
            //     custName: '',
            //     mergeBillCnt: 104,
            //     mergeMaAmtBillCnt: 51,
            //     txDate: "2017-03-06T16:00:00.000+0000",
            //     txDt: "2017-03-07"
            // },{
            //     acctBillCnt: 8,
            //     acctMaAmtBillCnt: 6,
            //     acctNum: "XG000010",
            //     contrCd: "cu1712",
            //     custId: "80013155",
            //     custName: '',
            //     mergeBillCnt: 152,
            //     mergeMaAmtBillCnt: 7,
            //     txDate: "2017-07-25T16:00:00.000+0000",
            //     txDt: "2017-07-26",
            // }
        ],
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
        tableDataList: [
            // {
            //     acctBargainCnt: 130,
            //     acctBargainQtty: 67592,
            //     acctNum: "XG000012",
            //     contrCd: "cu1712",
            //     custId: "80004448",
            //     custName: '',
            //     mergeBargainCnt: 70,
            //     mergeBargainQtty: 36629,
            //     txDate: "2017-01-02T16:00:00.000+0000",
            //     txDt: "2017-01-03"
            // },{
            //     acctBargainCnt: 10,
            //     acctBargainQtty: 5666,
            //     acctNum: "XG000012",
            //     contrCd: "cu1712",
            //     custId: "80003819",
            //     custName: '',
            //     mergeBargainCnt: 70,
            //     mergeBargainQtty: 36629,
            //     txDate: "2017-01-02T16:00:00.000+0000",
            //     txDt: "2017-01-03"
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00003",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80005146",
            //     custName: '',
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00003",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80008229",
            //     custName: '',
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // },{
            //     acctCurrNetMake: 374673,
            //     acctCurrNetPos: 0,
            //     acctNum: "XG00003",
            //     billMakePosQtty: 0,
            //     contrCd: "cu1712",
            //     custId: "80005257",
            //     custName: null,
            //     multiBillMakePosQtty: 0,
            //     statBosomDays: 150,
            // }
        ],
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


