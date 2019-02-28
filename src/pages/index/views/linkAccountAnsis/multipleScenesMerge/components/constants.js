export const mainTableColumns = [
    {field: 'acctGroSrc', label: '数据来源', align: 'center'}, // dataSrc
    {field: 'resultSetName', label: '结果集名称', align: 'center'}, // resultSetName/resultName
    {field: 'acctId', label: '账户组号', align: 'center'},
    {field: 'custId', label: '客户编号', align: 'center'},
    {field: 'custName', label: '客户名称', align: 'center'}, // customerName/custName
    {field: 'contractCode', label: '合约代码', align: 'center'}, // contractCode/contrCd
    // {field: 'acctGroupHold', label: '账户组持仓量', align: 'center'}, // acctGroupHold/acctGrMakePosQtty
    // {field: 'acctMakePosQtty', label: '账户持仓量', align: 'center'}, // customerHold/acctMakePosQtty
    {field: 'acctMultiMakePosQtty', label: '账户组多单持仓量', align: 'center'},
    {field: 'acctBillMakePosQtty', label: '账户组空单持仓量', align: 'center'},
    {field: 'multiBillMakePosQtty', label: '账户多单持仓量', align: 'center'},
    {field: 'billMakePosQtty', label: '账户空单持仓量', align: 'center'},
    {field: 'custWheOtherGro', label: '客户所在其他组', align: 'center'}, // custWheOtherGro/custOtherGr
    {field: 'buyBargainRela', label: '买入成交相关系数', align: 'center'},
    {field: 'sellBargainRela', label: '卖出成交相关系数', align: 'center'},
    {field: 'netBuyBargainRela', label: '净买入成交相关系数', align: 'center'},
    {field: 'longPosMakePosRela', label: '多头持仓相关系数', align: 'center'},
    {field: 'shortPosMakePosRela', label: '空头持仓相关系数', align: 'center'},
    {field: 'floatPrftLossRela', label: '浮动盈亏相关系数', align: 'center'},
    {field: 'idtfyCertNum', label: '身份证号', align: 'center'},
    {field: 'contTel', label: '联系电话', align: 'center'},
    {field: 'contAddr', label: '联系地址', align: 'center'},
    {field: 'zipCd', label: '邮编', align: 'center'},
    {field: 'workCorp', label: '工作单位', align: 'center'},
    {field: 'elecEmil', label: '电子邮件', align: 'center'},
    {field: 'bankAcct', label: '银行账号', align: 'center'},
    {field: 'investMger', label: '投资经理名称', align: 'center'},
    {field: 'investConsu', label: '投资顾问名称', align: 'center'},
    {field: 'raiProdEncode', label: '持有产品', align: 'center'},
    {field: 'nextBillPerson', label: '下单人名称', align: 'center'},
    {field: 'lpSubstTbl', label: '法人代表名称', align: 'center'},
    {field: 'capAnniberson', label: '资金调拨人名称', align: 'center'},
    {field: 'stlBillCfmerson', label: '结算单确认人名称', align: 'center'},
    {field: 'openAutherson', label: '开户授权人名称', align: 'center'},
    {field: 'avgBargainQtty', label: '日均成交量', align: 'center'},
    {field: 'avgBillCnt', label: '日均报单次数', align: 'center'},
    {field: 'avgBargainRate', label: '日均成交率', align: 'center'},
    {field: 'avgCancelBillRate', label: '日均撤单率', align: 'center'},
    {field: 'avgOperTmMargin', label: '日均平均操作时间差', align: 'center'},
];
export const chartTableColumns1 = [
    {label: '客户编号1', field: 'custId1', align: 'center', minWidth: 130},
    {label: '客户编号2', field: 'custId2', align: 'center', minWidth: 130},
    {label: '买入成交相关系数', field: 'buyBargainRela', align: 'center', minWidth: 160},
    {label: '卖出成交相关系数', field: 'sellBargainRela', align: 'center', minWidth: 160},
    {label: '净买入成交相关系数', field: 'netBuyBargainRela', align: 'center', minWidth: 160},
    {label: '多头持仓相关系数', field: 'longPosMakePosRela', align: 'center', minWidth: 160},
    {label: '空头持仓相关系数', field: 'shortPosMakePosRela', align: 'center', minWidth: 160},
    {label: '浮动盈亏相关系数', field: 'floatPrftLossRela', align: 'center', minWidth: 160},
];
export const chartTableColumns2 = [
    {label: '客户编号', field: 'custId', align: 'center', minWidth: 130, fixed: true},
    {label: '身份证号', field: 'idtfyCertNum', align: 'center', minWidth: 130},
    {label: '联系电话', field: 'contTel', align: 'center', minWidth: 130},
    {label: '联系地址', field: 'contAddr', align: 'center', minWidth: 130},
    {label: '邮编', field: 'zipCd', align: 'center', minWidth: 100},
    {label: '工作单位', field: 'workCorp', align: 'center', minWidth: 100},
    {label: '电子邮件', field: 'elecEmil', align: 'center', minWidth: 130},
    {label: '银行账号', field: 'bankAcct', align: 'center', minWidth: 130}
];
export const chartTableColumns3 = [
    {label: '客户编号', field: 'custId', align: 'center', minWidth: 130, fixed: true},
    {field: 'multiBillMakePosQtty', label: '账户多单持仓量', align: 'center', minWidth: 160},
    {field: 'billMakePosQtty', label: '账户空单持仓量', align: 'center', minWidth: 160},
    {field: 'avgBargainQtty', label: '日均成交量', align: 'center', minWidth: 160},
    {field: 'avgBillCnt', label: '日均报单次数', align: 'center', minWidth: 160},
    {field: 'avgBargainRate', label: '日均成交率', align: 'center', minWidth: 160},
    {field: 'avgCancelBillRate', label: '日均撤单率', align: 'center', minWidth: 160},
    {field: 'avgOperTmMargin', label: '日均平均操作时间差', align: 'center', minWidth: 160}
];
export const chartTableColumns4 = [
    {label: '客户编号', field: 'custId', align: 'center', minWidth: 130, fixed: true},
    {label: '投资经理', field: 'investMger', align: 'center', minWidth: 100},
    {label: '投资顾问', field: 'investConsu', align: 'center', minWidth: 100},
    {label: '权益产品编码', field: 'raiProdEncode', align: 'center', minWidth: 130},
    {label: '下单人', field: 'nextBillPerson', align: 'center', minWidth: 100},
    {label: '法人代表', field: 'lpSubstTbl', align: 'center', minWidth: 100},
    {label: '资金调拨人', field: 'capCannibPerson', align: 'center', minWidth: 100},
    {label: '结算单确认人', field: 'stlBillCfmPerson', align: 'center', minWidth: 130},
    {label: '开户授权人', field: 'openAuthPerson', align: 'center', minWidth: 100}
];
export const blocks = [
    {
        title: '相关系数识别',
        icon: 'fa fa-percent',
        loading: false,
        toggleDetailFlags: false
    },
    {
        title: '客户基本信息识别',
        icon: 'fa fa-search-location',
        loading: false,
        toggleDetailFlags: false
    },
    {
        title: '高频聚类识别',
        icon: 'fa fa-search-dollar',
        loading: false,
        toggleDetailFlags: false
    },
    {
        title: '实控关系识别',
        icon: 'fa fa-link',
        loading: false,
        toggleDetailFlags: false
    }
];