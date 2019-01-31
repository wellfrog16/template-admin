import custIdColumn from '@/components/index/common/CustIdColumn';
// import {graphData} from './testJson';
import {accountTotalFrepOptions, sfOptions} from '../../sceneConfig/components/constants';
let formatAlmSel = item => {
    let index = sfOptions.findIndex(v => { return v.value === item; });
    return sfOptions[index]['label'];
};
let formatFreq = item => {
    let index = accountTotalFrepOptions.findIndex(v => { return v.value === item; });
    return accountTotalFrepOptions[index]['label'];
};
export const charts = [
    {title: '账户组相关性概览', icon: 'fa fa-globe', toggleDetailFlags: false, loading: false},
    {title: '账户组历史持仓', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '账户组历史成交', icon: 'fa fa-handshake', toggleDetailFlags: false, loading: false},
    {title: '账户组分时报单', icon: 'fa fa-chart-line', toggleDetailFlags: false, loading: false}
];
export const chartsBV = [
    {title: '聚类情况处理', icon: 'fa fa-globe', toggleDetailFlags: false, loading: false},
    {title: '账户组历史持仓', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '账户组稳态分析-按时间', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '账户组稳态分析-按客户', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false}
];
export const chartsBI = [
    {title: '账户组基本信息概览', icon: 'fa fa-globe', toggleDetailFlags: false, loading: false},
    {title: '账户组历史持仓', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '账户组历史成交', icon: 'fa fa-handshake', toggleDetailFlags: false, loading: false},
    {title: '账户组分时报单', icon: 'fa fa-chart-line', toggleDetailFlags: false, loading: false}
];
export const chartsRL = [
    {title: '账户组关系概览', icon: 'fa fa-globe', toggleDetailFlags: false, loading: false},
    {title: '账户组历史持仓', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '账户组历史成交', icon: 'fa fa-handshake', toggleDetailFlags: false, loading: false},
    {title: '账户组分时报单', icon: 'fa fa-chart-line', toggleDetailFlags: false, loading: false}
];
export const chartTableColumns1 = [
    {label: '账户组编号', field: 'acctId', minWidth: 130, fixed: true},
    {label: '子账户数量', field: 'custQtty', minWidth: 130},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '当前净持仓量', field: 'acctGroOpenInt', minWidth: 140},
    {label: '相关系数', field: 'acctGroAvgRela', minWidth: 100},
    {label: '所属客户编号', field: 'custIds', minWidth: 130}
];
export const chartTableColumns2 = [
    {label: '账户组编号', field: 'acctId', minWidth: 130, fixed: true},
    {label: '客户编号', field: 'custId', minWidth: 130, fixed: true, template: custIdColumn},
    {label: '交易日', field: 'txDay', minWidth: 130},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '当前净持仓量', field: 'acctNetOpenInt', minWidth: 140},
    // {label: '当前净持仓金额', field: 'posLimQtty', minWidth: 150},
    {label: '账户组净持仓量', field: 'acctGroNetOpenInt', minWidth: 150},
    {label: '空单净持仓量', field: 'nuBillOpenInt', minWidth: 140},
    {label: '多单净持仓量', field: 'multiBillOpenInt', minWidth: 140}
];
export const chartTableColumns3 = [ // no use
    {label: '账户组编号', field: '', minWidth: 130},
    {label: '客户编号', field: '', minWidth: 130, template: custIdColumn},
    {label: '交易日', field: '', minWidth: 130},
    {label: '合约代码', field: '', minWidth: 100},
    {label: '买入量', field: '', minWidth: 100},
    {label: '卖出量', field: '', minWidth: 100},
    {label: '多头持仓量', field: '', minWidth: 130},
    {label: '多头持仓量', field: '', minWidth: 130},
    {label: '盈亏', field: '', minWidth: 100},
    {label: '净买入量', field: '', minWidth: 100},
    {label: '净持仓量', field: '', minWidth: 100}
];
export const chartTableColumns4 = [
    {label: '客户编号', field: 'custId', minWidth: 130, fixed: true, template: custIdColumn},
    {label: '买卖方向', field: 'bizDir', minWidth: 100},
    // {label: '报单时间1', field: 'declBillTm1', minWidth: 100},
    {label: '报单时间', field: 'declBillTm2', minWidth: 140},
    {label: '报单数量', field: 'declBillQtty', minWidth: 130},
    {label: '报单价格', field: 'declBillPrice', minWidth: 130},
    {label: '成交时间', field: 'bargainDate', minWidth: 180},
    {label: '成交数量', field: 'bargainQtty', minWidth: 130},
    {label: '成交价格', field: 'bargainPrice', minWidth: 130}
];
export const chartTableColumns5 = [ // 地址分析关系图明细字段
    {label: '账户组号', field: 'acctId', minWidth: 130, fixed: true},
    {label: '账户组客户编号', field: 'acctCustId', minWidth: 160},
    {label: '姓名相同', field: 'nameSame', minWidth: 140},
    {label: '身份证相同', field: 'idtfyCertSame', minWidth: 130},
    {label: '联系电话相同', field: 'contTelSame', minWidth: 130},
    {label: '联系地址相同', field: 'contAddrSame', minWidth: 180},
    {label: '邮编相同', field: 'zipCdSame', minWidth: 130},
    {label: '工作单位相同', field: 'workCorpSame', minWidth: 130},
    {label: '电子邮件相同', field: 'elecEailSame', minWidth: 130},
    {label: '银行账号相同', field: 'bankAcctSame', minWidth: 130},
    {label: '地址近似', field: 'addrLike', minWidth: 130}
];
export const chartTableColumns6 = [ // 实控关系分析关系图明细字段
    {label: '账户组号', field: 'acctId', minWidth: 130, fixed: true},
    {label: '账户组客户编号', field: 'acctCustId', minWidth: 160},
    {label: '同一投资经理', field: 'sameInvestMger', minWidth: 140},
    {label: '同一投资顾问', field: 'sameInvestConsu', minWidth: 130},
    {label: '同一权益持有人', field: 'sameRaiHoldPerson', minWidth: 130},
    {label: '同一下单人', field: 'sameNextBillPerson', minWidth: 180},
    {label: '同一法人代表', field: 'sameCapCannibPerson', minWidth: 130},
    {label: '同一资金调拨人', field: 'sameLpSubstTbl', minWidth: 130},
    {label: '同一结算单确认人', field: 'sameStlBillCfmPerson', minWidth: 160},
    {label: '同一开户授权人', field: 'sameOpenAuthPerson', minWidth: 130}
];

export const chartTableColumns7 = [ // 聚类散点图明细字段
    {label: '账户组号', field: 'acctId', minWidth: 130, fixed: true},
    {label: '客户编号', field: 'custId', minWidth: 160, fixed: true},
    {label: '合约代码', field: 'contrCd', minWidth: 140},
    {label: '统计起始日', field: 'statStartDt', minWidth: 160},
    {label: '统计截止日', field: 'statStopDay', minWidth: 160},
    {label: '日均成交量', field: 'bargainQtty', minWidth: 160},
    {label: '日均报单次数', field: 'billCnt', minWidth: 160},
    {label: '日均成交率', field: 'bargainRate', minWidth: 160},
    {label: '日均撤单率', field: 'billRate', minWidth: 160},
    {label: '日均操作时间差', field: 'avgOperTmMargin', minWidth: 160},
    {label: '账户组多头持仓量', field: 'acctGroLongQtty', align: 'center', minWidth: 160},
    {label: '账户组空头持仓量', field: 'acctGroShortQtty', align: 'center', minWidth: 160},
    {label: '账户多头持仓量', field: 'acctLongQtty', align: 'center', minWidth: 160},
    {label: '账户空头持仓量', field: 'acctShortQtty', align: 'center', minWidth: 160}
];
export const chartTableColumns10 = [
    {label: '账户组编号', field: 'acctId', minWidth: 130, fixed: true},
    {label: '客户编号', field: 'custId', minWidth: 130, fixed: true, template: custIdColumn},
    {label: '交易日', field: 'txDay', minWidth: 130},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '账户组多头持仓量', field: 'acctGroLongQtty', minWidth: 150},
    {label: '账户组空头持仓量', field: 'acctGroShortQtty', minWidth: 150},
    {label: '账户多头持仓量', field: 'acctLongQtty', minWidth: 150},
    {label: '账户空头持仓量', field: 'acctShortQtty', minWidth: 150},
    {label: '限仓量', field: 'limitQtty', minWidth: 150}
];
export const chartTableColumns8 = [ // 聚类稳态分析-时间图明细字段
    {label: '交易日期', field: 'txDt', minWidth: 150, fixed: true},
    {label: '客户编号', field: 'custId', minWidth: 160, fixed: true},
    {label: '客户数', field: 'custCnt', minWidth: 100}
];
export const chartTableColumns9 = [ // 聚类稳态分析-客户图明细字段
    {label: '客户编号', field: 'custId', minWidth: 160, fixed: true},
    {label: '出现次数', field: 'appearCnt', minWidth: 100}
];

// tree-相关性
export const mainTableColumns = [
    {
        field: 'acctId',
        label: '账户组号',
        align: 'center'
    },
    {
        field: 'custId',
        label: '客户编号',
        align: 'center'
    },
    {
        field: 'custName',
        label: '客户名称',
        align: 'center'
    },
    {
        field: 'acctGroAvgRelaCoef',
        label: '账户组平均相关系数',
        align: 'center'
    },
    {
        field: 'acctAvgRelaCoef',
        label: '账户平均相关系数',
        align: 'center'
    },
    {
        field: 'contrCd',
        label: '合约代码',
        align: 'center'
    },
    {
        field: 'acctGroNetOpenInt',
        label: '账户组净持仓量',
        align: 'center'
    },
    {
        field: 'acctNetOpenInt',
        label: '账户净持仓量',
        align: 'center'
    },
    {
        field: 'custWheOtherGro',
        label: '客户所在其他组',
        align: 'center'
    },
    {
        field: 'buyBargainRela',
        label: '买入成交相关系数',
        align: 'center'
    },
    {
        field: 'sellBargainRela',
        label: '卖出成交相关系数',
        align: 'center'
    },
    {
        field: 'netBuyBargainRela',
        label: '净买入成交相关系数',
        align: 'center'
    },
    {
        field: 'longPosMakePosRela',
        label: '多头持仓相关系数',
        align: 'center'
    },
    {
        field: 'shortPosMakePosRela',
        label: '空头持仓相关系数',
        align: 'center'
    },
    {
        field: 'floatPrftLossRela',
        label: '浮动盈亏相关系数',
        align: 'center'
    }
];
// tree-聚类
export const mainTableColumnsBV = [
    {field: 'acctId', label: '账户组号', align: 'center'},
    {field: 'custId', label: '客户编号', align: 'center'},
    {field: 'custName', label: '客户名称', align: 'center'},
    {field: 'contrCd', label: '合约代码', align: 'center'},
    {field: 'acctGroLongQtty', label: '账户组多头持仓量', align: 'center'},
    {field: 'acctGroShortQtty', label: '账户组空头持仓量', align: 'center'},
    {field: 'acctLongQtty', label: '账户多头持仓量', align: 'center'},
    {field: 'acctShortQtty', label: '账户空头持仓量', align: 'center'},
    {field: 'bargainQtty', label: '成交量', align: 'center'},
    {field: 'billCnt', label: '报单次数', align: 'center'},
    {field: 'bargainRate', label: '成交率', align: 'center'},
    {field: 'billRate', label: '撤单率', align: 'center'},
    {field: 'avgOperTmMargin', label: '平均操作时间差', align: 'center'},
    {field: 'statStartDt', label: '统计起始日', align: 'center'},
    {field: 'statStopDay', label: '统计截止日', align: 'center'},
    {field: 'statFreq', label: '统计频度', align: 'center', formatter: formatFreq},
    {field: 'algoSel', label: '算法选择', align: 'center', formatter: formatAlmSel}
];
// tree-基本信息
export const mainTableColumnsBI = [
    {
        field: 'acctId',
        label: '账户组号',
        align: 'center'
    },
    {
        field: 'custId',
        label: '客户编号',
        align: 'center'
    },
    {
        field: 'custName',
        label: '客户名称',
        align: 'center'
    },
    {
        field: 'contrCd',
        label: '合约代码',
        align: 'center'
    },
    {
        field: 'acctMakeGroPosQtty',
        label: '账户组净持仓量',
        align: 'center'
    },
    {
        field: 'acctMakePosQtty',
        label: '账户净持仓量',
        align: 'center'
    },
    {
        field: 'custOther',
        label: '客户所在其他组',
        align: 'center'
    },
    {
        field: 'idtfyCertNum',
        label: '身份证',
        align: 'center'
    },
    {
        field: 'contTel',
        label: '联系电话',
        align: 'center'
    },
    {
        field: 'contAddr',
        label: '联系地址',
        align: 'center'
    },
    {
        field: 'zipCd',
        label: '邮编',
        align: 'center'
    },
    {
        field: 'workCorp',
        label: '工作单位',
        align: 'center'
    },
    {
        field: 'elecEmil',
        label: '电子邮件',
        align: 'center'
    },
    {
        field: 'bankAcct',
        label: '银行账号',
        align: 'center'
    },
    /* {
        field: '',
        label: '当地纳税号',
        align: 'center'
    },
    {
        field: '',
        label: '当地社保ID',
        align: 'center'
    },
    {
        field: '',
        label: '驾照号',
        align: 'center'
    },
    {
        field: '',
        label: '港澳通行证号',
        align: 'center'
    } */
];
// tree-实控关系
export const mainTableColumnsRL = [
    {
        field: 'acctId',
        label: '账户组号',
        align: 'center'
    },
    {
        field: 'custId',
        label: '客户编号',
        align: 'center'
    },
    {
        field: 'custName',
        label: '客户名称',
        align: 'center'
    },
    {
        field: 'contrCd',
        label: '合约代码',
        align: 'center'
    },
    {
        field: 'acctGrMakePosQtty',
        label: '账户组净持仓量',
        align: 'center'
    },
    {
        field: 'acctMakePosQtty',
        label: '账户净持仓量',
        align: 'center'
    },
    {
        field: 'custOtherGr',
        label: '客户所在其他组',
        align: 'center'
    },
    {
        field: 'nextBillPerson',
        label: '指定下单人',
        align: 'center'
    },
    {
        field: 'capCannibPerson',
        label: '资金调拨人',
        align: 'center'
    },
    {
        field: 'stlBillCfmPerson',
        label: '结算单确认人',
        align: 'center'
    },
    {
        field: 'lpSubstTbl',
        label: '法人代表',
        align: 'center'
    },
    {
        field: 'openAuthPerson',
        label: '开户授权人',
        align: 'center'
    },
    /* {
        field: '',
        label: '分户管理资产负责人',
        align: 'center'
    },
    {
        field: '',
        label: '托(保)管机构联系人',
        align: 'center'
    }, */
    {
        field: 'investMger',
        label: '投资经理',
        align: 'center'
    },
    {
        field: 'investConsu',
        label: '投资顾问',
        align: 'center'
    },
    {
        field: 'raiProdEncode',
        label: '权益产品编码',
        align: 'center'
    }
];
let ddd = [];
for (let i = 0; i < 21; i++) {
    ddd.push({
        'id': i,
        'acctId': 'XG' + i,
        'children': (() => {
            let d = [];
            for (let ii = 0; ii < 11; ii++) {
                d.push({
                    'id': String(i) + String(ii),
                    'acctId': 'XG' + i,
                    'custId': '80' + String(i) + String(ii),
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'BB001, BB001, BB001, BB001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                });
            }
            return d;
        })()
    });
}
export const resData1 = {
    'mainTableData': ddd,
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
            'acctGroOpenInt': 2000,
            'custQtty': 200
        },
        {
            'acctId': 'XG00003',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 3000,
            'custQtty': 100
        },
        {
            'acctId': 'XG00004',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 4000,
            'custQtty': 100
        },
        {
            'acctId': 'XG00005',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 5000,
            'custQtty': 40
        },
        {
            'acctId': 'XG00006',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.1,
            'acctGroOpenInt': 6000,
            'custQtty': 10
        },
        {
            'acctId': 'XG00007',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.42,
            'acctGroOpenInt': 7000,
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
    },
    tableData: [{
        acctGroNetOpenInt: 193496715,
        acctId: 'XG00001',
        acctNetOpenInt: -2573,
        contrCd: 'cu1712',
        custId: '80000025',
        multiBillOpenInt: 0,
        nuBillOpenInt: 2573,
        posLimQtty: 10000,
        txDay: '2017-02-19'
    }]
};
export const table3Options = [
    {label: '买入数量', field: 'buyQtty', minWidth: 100},
    {label: '卖出数量', field: 'sellQtty', minWidth: 100},
    {label: '买入笔数', field: 'buyCnt', minWidth: 100},
    {label: '卖出笔数', field: 'sellCnt', minWidth: 100},
    {label: '多头持仓量', field: 'longPosOpenInt', minWidth: 130},
    {label: '空头持仓量', field: 'shortPosOpenInt', minWidth: 130},
    {label: '盈亏', field: 'prftLoss', minWidth: 90},
    {label: '净买入量', field: 'netBuyQtty', minWidth: 100},
    {label: '净持仓量', field: 'netOpenInt', minWidth: 100}
];
export const respData3 = {
    mainData: [
        {txDt: '2013-01-02', openQuotPrice: '2320.26', closeQuotPrice: '2320.26', highestPrice: '2987.3', lowestPrice: '2362.94', sellAcctCnt: 3, buyAcctCnt: 22},
        {txDt: '2013-01-03', openQuotPrice: '2300', closeQuotPrice: '2300', highestPrice: '2288.26', lowestPrice: '2288.26', sellAcctCnt: 2, buyAcctCnt: 3},
        {txDt: '2013-01-04', openQuotPrice: '2288.26', closeQuotPrice: '2320.26', highestPrice: '2400', lowestPrice: '2362.94', sellAcctCnt: 6, buyAcctCnt: 9},
        {txDt: '2013-01-05', openQuotPrice: '2300', closeQuotPrice: '2288.26', highestPrice: '2420.26', lowestPrice: '2362.94', sellAcctCnt: 32, buyAcctCnt: 2},
        {txDt: '2013-01-06', openQuotPrice: '2300', closeQuotPrice: '2362.94', highestPrice: '2588.26', lowestPrice: '2320.26', sellAcctCnt: 9, buyAcctCnt: 4},
    ],
    tableData: [
        {
            date: '2017-04-14',
            map: {
                80000025: {
                    acctId: '11111',
                    buyCnt: '11111',
                    buyQtty: '11111',
                    contrCd: '11111',
                    custId: '11111',
                    longPosOpenInt: '11111',
                    netBuyQtty: '11111',
                    netOpenInt: '11111',
                    prftLoss: '11111',
                    sellCnt: '11111',
                    sellQtty: '11111',
                    shortPosOpenInt: '11111',
                    txDay: '11111'
                }
            }
        }
    ]
};
export const respData4 = {
    mainData: [
        {time: '12:09', price: 12},
        {time: '12:19', price: 22}
    ],
    buy: {
        20189898: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189897: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189896: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189895: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189894: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
    },
    sail: {
        20189898: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189897: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189896: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189895: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189894: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
    },
    tableData: [
        {a: 1, b: 2}
    ]
};
export let testData = {
    chartData: [
        {acctId: 'JL00005', custId: '2018090999', data1: 1, data2: 3, data3: 9, data4: 27, data5: 17, data6: 9},
        {acctId: 'JL00005', custId: '2018090919', data1: 4, data2: 1, data3: 19, data4: 7, data5: 16, data6: 19},
        {acctId: 'JL00005', custId: '2018090929', data1: 11, data2: 8, data3: 9, data4: 17, data5: 11, data6: 99},
        {acctId: 'JL00005', custId: '2018090939', data1: 6, data2: 18, data3: 29, data4: 12, data5: 31, data6: 29},
        {acctId: 'JL00005', custId: '2018090949', data1: 16, data2: 18, data3: 39, data4: 27, data5: 44, data6: 9},
        {acctId: 'JL00005', custId: '2018090959', data1: 26, data2: 42, data3: 49, data4: 37, data5: 55, data6: 91},
        {acctId: 'JL00005', custId: '2018090969', data1: 36, data2: 13, data3: 59, data4: 47, data5: 13, data6: 9},
        {acctId: 'JL00005', custId: '2018090129', data1: 46, data2: 38, data3: 19, data4: 17, data5: 71, data6: 93},
        {acctId: 'JL00005', custId: '2018090229', data1: 61, data2: 18, data3: 9, data4: 1, data5: 13, data6: 49},
        {acctId: 'JL00005', custId: '2018090329', data1: 6, data2: 8, data3: 77, data4: 9, data5: 11, data6: 19},
        {acctId: 'JL00007', custId: '2018090918', data1: 18, data2: 37, data3: 28, data4: 17, data5: 7, data6: 98},
        {acctId: 'JL00007', custId: '2018090918', data1: 38, data2: 87, data3: 38, data4: 12, data5: 71, data6: 9},
        {acctId: 'JL00007', custId: '2018090918', data1: 78, data2: 17, data3: 18, data4: 17, data5: 57, data6: 79},
        {acctId: 'JL00009', custId: '2018090338', data1: 8, data2: 17, data3: 28, data4: 19, data5: 7, data6: 49},
        {acctId: 'JL00009', custId: '2018090128', data1: 18, data2: 17, data3: 28, data4: 57, data5: 6, data6: 9},
        {acctId: 'JL00009', custId: '2018090548', data1: 48, data2: 37, data3: 2, data4: 11, data5: 17, data6: 19},
    ],
    mainTableData: ddd
};