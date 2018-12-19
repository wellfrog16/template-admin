export const mainTableColumns = [
<<<<<<< Updated upstream
    {field: 'resultSetName', label: '结果集名称', align: 'center'},
    {field: 'acctId', label: '账户组号', align: 'center'},
    {field: 'custId', label: '客户编号', align: 'center'},
    {field: 'customerName', label: '客户名称', align: 'center'},
    {field: 'contractCode', label: '合约代码', align: 'center'},
    {field: 'acctGroupHold', label: '账户组持仓量', align: 'center'},
    {field: 'customerHold', label: '账户持仓量', align: 'center'},
    {field: 'custWheOtherGro', label: '客户所在其他组', align: 'center'},
    {field: 'acctGroSrc', label: '账户组来源', align: 'center'}
=======
    {field: 'resultSetName', label: '结果集名称', minWidth: '50',},
    {field: 'acctId', label: '账户组号'},
    {field: 'custId', label: '客户编号'},
    {field: 'customerName', label: '客户名称',},
    {field: 'contractCode', label: '合约代码'},
    {field: 'acctGroupHold', label: '账户组持仓量'},
    {field: 'customerHold', label: '账户持仓量'},
    {field: 'custWheOtherGro', label: '客户所在其他组'},
    {field: 'acctGroSrc', label: '账户组来源'}
];
export const resData1 = {
    'mainTableData': [
        {
            id: 1885,
            acctId: 'XG00001',
            children: [
                {
                    'id': 292073,
                    'acctId': 'XG00001',
                    'custId': '20180000002',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'BB001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                }
            ]
        },
        {
            'id': 46357,
            'acctId': 'XG00002',
            'children': [
                {
                    'id': 185878,
                    'acctId': 'XG00002',
                    'custId': '20180000005',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'XG00002',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                },
                {
                    'id': 205179,
                    'acctId': 'XG00002',
                    'custId': '20180000007',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'XG00002',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                }
            ]
        },
        {
            'id': 92527,
            'acctId': 'XG00003',
            'children': [
                {
                    'id': 109006,
                    'acctId': 'XG00003',
                    'custId': '20180000003',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'XG00003',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                },
                {
                    'id': 299236,
                    'acctId': 'XG00003',
                    'custId': '20180000006',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'XG00003',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                }
            ]
        }
    ],
    'chartData': [
        {
            'acctId': 'XG00001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': 0.2,
            'acctGroOpenInt': 1000,
            'custQtty': 20
        },
        {
            'acctId': 'XG00002',
            'contrCd': 'CU1712',
            'acctGroAvgRela': 0.4,
            'acctGroOpenInt': 3000,
            'custQtty': 200
        },
        {
            'acctId': 'XG00003',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 6000,
            'custQtty': 100
        },
        {
            'acctId': 'XG00004',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 1000,
            'custQtty': 100
        },
        {
            'acctId': 'XG00005',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 1200,
            'custQtty': 40
        },
        {
            'acctId': 'XG00006',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.1,
            'acctGroOpenInt': 5000,
            'custQtty': 10
        },
        {
            'acctId': 'XG00007',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.42,
            'acctGroOpenInt': 2000,
            'custQtty': 70
        }
    ]
};
export const resData2 = {
    qtty: 3000,
    mainData: {
        '20180909': [
            {date: '2018-11-08', value: '1122'},
            {date: '2018-11-02', value: '4444'},
            {date: '2018-11-05', value: '1122'},
            {date: '2018-11-04', value: '1122'},
            {date: '2018-11-05', value: '1122'},
        ],
        '20180911': [
            {date: '2018-11-01', value: '1122'},
            {date: '2018-11-02', value: '4444'},
            {date: '2018-11-03', value: '1122'},
            {date: '2018-11-04', value: '1122'},
            {date: '2018-11-05', value: '1122'},
        ]
    }
};
export const table3Options = [
    {label: '买入量', field: 'a', minWidth: 100},
    {label: '卖出量', field: 'b', minWidth: 100},
    {label: '多头持仓量', field: 'c', minWidth: 130},
    {label: '多头持仓量', field: '', minWidth: 130},
    {label: '盈亏', field: '', minWidth: 90},
    {label: '净买入量', field: '', minWidth: 100},
    {label: '净持仓量', field: '', minWidth: 100}
];
export const chart3Data = [
    {date: '2013-01-02', open: '2320.26', close: '2320.26', highest: '2987.3', lowest: '2362.94'},
    {date: '2013-01-03', open: '2300', close: '2300', highest: '2288.26', lowest: '2288.26'},
    {date: '2013-01-04', open: '2288.26', close: '2320.26', highest: '2400', lowest: '2362.94'},
    {date: '2013-01-05', open: '2300', close: '2288.26', highest: '2420.26', lowest: '2362.94'},
    {date: '2013-01-06', open: '2300', close: '2362.94', highest: '2588.26', lowest: '2320.26'},
];
export const chart3ScatterData = [
    {date: '2013-01-02', open: '2320.26', close: '2320.26', highest: '2987.3', lowest: '2362.94', count1: 3, count2: 22},
    {date: '2013-01-03', open: '2300', close: '2300', highest: '2288.26', lowest: '2288.26', count1: 2, count2: 3},
    {date: '2013-01-04', open: '2288.26', close: '2320.26', highest: '2400', lowest: '2362.94', count1: 6, count2: 9},
    {date: '2013-01-05', open: '2300', close: '2288.26', highest: '2420.26', lowest: '2362.94', count1: 32, count2: 2},
    {date: '2013-01-06', open: '2300', close: '2362.94', highest: '2588.26', lowest: '2320.26', count1: 9, count2: 4},
];
export const chart4Data = [
    {time: '12:29', price: 123, count: 1, type: '买入量'},
    {time: '12:30', price: 111, count: 4, type: '卖出量'},
    {time: '12:31', price: 103, count: 11, type: '卖出量'},
    {time: '12:32', price: 130, count: 8, type: '卖出量'},
>>>>>>> Stashed changes
];
