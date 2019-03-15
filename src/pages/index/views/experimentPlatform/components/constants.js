import {chartTableColumns4, chartTableColumns8, chartTableColumns9} from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/constants';
// 客户地址查询
export const columns = [
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
export const charts = [
    {title: '稳态分析-按时间', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '稳态分析-按客户', icon: 'fa fa-chart-bar', toggleDetailFlags: false, loading: false},
    {title: '账户组历史成交', icon: 'fa fa-handshake', toggleDetailFlags: false, loading: false},
    {title: '账户组分时报单', icon: 'fa fa-chart-line', toggleDetailFlags: false, loading: false}
];
export const table3Options = [
    {label: '买入数量', field: 'buyQtty', minWidth: 100},
    {label: '卖出数量', field: 'sellQtty', minWidth: 100},
    {label: '买入笔数', field: 'buyCnt', minWidth: 100},
    {label: '卖出笔数', field: 'sellCnt', minWidth: 100},
    {label: '多头持仓量', field: 'longPosOpenInt', minWidth: 130},
    {label: '空头持仓量', field: 'shortPosOpenInt', minWidth: 130},
    {label: '盈亏', field: 'prftLoss', minWidth: 90},
    {label: '净买入量', field: 'netBuyQtty', minWidth: 100},
    {label: '净持仓量', field: 'netOpenInt', minWidth: 100},
    {label: '成交量', field: 'bargainQuantity', minWidth: 100},
];
export const chartTableColumns = [chartTableColumns8, chartTableColumns9, [], chartTableColumns4];