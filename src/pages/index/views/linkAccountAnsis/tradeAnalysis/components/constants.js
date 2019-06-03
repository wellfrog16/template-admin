import tagsColumn from './tagsColumn';
export const userListColumns = [
    {label: '用户名称', field: 'userName', minWidth: 100},
    {label: '用户编号', field: 'userId', minWidth: 100},
    {label: '持仓量', field: 'qtty', minWidth: 100, sortable: true},
    {label: '是否盈利盘', field: 'prftF', minWidth: 100},
    {label: '事件标签', field: 'eventLabel', minWidth: 300, template: tagsColumn},
    {label: '历史事件标签', field: 'hEventLabel', minWidth: 200, template: tagsColumn},
    {label: '交易风格标签', field: 'txStyleLabel', minWidth: 200, template: tagsColumn},
    {label: '模型标签', field: 'modelLabel', minWidth: 200, template: tagsColumn},
    {label: '外部标签', field: 'extLabel', minWidth: 200, template: tagsColumn}
];
export const tradeDetailColumns = [
    {label: '用户编号', field: 'userId', minWidth: 100},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '交易日期', field: 'tradingday', minWidth: 130},
    {label: '买卖', field: 'buySell', minWidth: 100},
    {label: '开平标志', field: 'kaipingFlag', minWidth: 100},
    {label: '投机套保标志', field: 'hedgeflag', minWidth: 100},
    {label: '价格', field: 'price', minWidth: 100},
    {label: '数量', field: 'quantity', minWidth: 100},
    {label: '成交时间', field: 'tranday', minWidth: 100},
    {label: '成交类型', field: 'tranType', minWidth: 100},
    {label: '持仓盈亏', field: 'positionprofit', minWidth: 100},
    {label: '浮动盈亏', field: 'openprofit', minWidth: 100},
    {label: '平仓盈亏', field: 'closeprofit', minWidth: 100},
];
export const staticInfoColumns = [
    {field: 'custId', label: '客户编号', width: '200'},
    {field: 'custName', label: '客户名称', width: '200'},
    {field: 'custType', label: '客户类型', width: '200'},
    {field: 'bankSwift', label: '开户银行', width: '200'},
    {field: 'bankAcct', label: '银行帐号', width: '200'},
    {field: 'bankday', label: '开户日期', width: '200'},
    {field: 'addr', label: '地址', width: '200'},
    {field: 'zipCd', label: '邮编', width: '200'},
    {field: 'phone', label: '电话号码', width: '200'},
    {field: 'sex', label: '性别', width: '200'},
    {field: 'birthdt', label: '出生日期', width: '200'},
    {field: 'localTaxid', label: '当地纳税号', width: '250'},
    {
        field: 'localSocialsecurityid',
        label: '当地社保ID',
        width: '250',
        align: 'center'
    },
    {field: 'localId', label: '当地身份证号', width: '250'},
    {field: 'licenceid', label: '驾照号', width: '200'},
    {
        field: 'hkMacaoPass',
        label: '港澳居民来往内地通行证',
        width: '280',
        align: 'center'
    },
    {field: 'workUnit', label: '工作单位', width: '200'},
    {field: 'position', label: '职位', width: '200'},
    {field: 'corpChar', label: '单位性质', width: '200'},
    {field: 'email', label: '电子邮件', width: '200'},
    {field: 'zdxSoloName', label: '指定下单人姓名', width: '200'},
    {
        field: 'zdxSoloDoctype',
        label: '指定下单人证件类型',
        width: '250',
        align: 'center'
    },
    {
        field: 'zdxSoloDocid',
        label: '指定下单人证件号码',
        width: '250',
        align: 'center'
    },
    {field: 'zdxSoloAddr', label: '指定下单人地址', width: '250'},
    {field: 'zdxSoloZipCd', label: '指定下单人邮编', width: '250'},
    {
        field: 'fundTranpername',
        label: '资金调拨人姓名',
        width: '250',
        align: 'center'
    },
    {
        field: 'fundTranperaddr',
        label: '资金调拨人地址',
        width: '250',
        align: 'center'
    },
    {
        field: 'fundTranperzipCd',
        label: '资金调拨人邮编',
        width: '250',
        align: 'center'
    },
    {
        field: 'statCfmname',
        label: '结算单确认人姓名',
        width: '250',
        align: 'center'
    },
    {
        field: 'statCfmaddr',
        label: '结算单确认人地址',
        width: '250',
        align: 'center'
    },
    {
        field: 'statCfmzipCd',
        label: '结算单确认人邮编',
        width: '250',
        align: 'center'
    },
    {field: 'custOpenmodel', label: '客户开户模式', width: '200'},
    {field: 'oaiName', label: '开户或中介机构名称', width: '260'},
    {
        field: 'oaiFilingid',
        label: '开户或中介机构备案号',
        width: '260',
        align: 'center'
    }
];