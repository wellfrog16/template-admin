
// 客户地址查询
export const columnsCTrI1 = [
    {field: "custId", label: "客户编号", width: '200', align: ''},
    {field: "custName", label: "客户名称", width: '200', align: ''},
    {field: "custType", label: "客户类型", width: '200', align: ''},
    {field: "bankSwift", label: "开户银行", width: '200', align: ''},
    {field: "bankAcct", label: "银行帐号", width: '200', align: ''},
    {field: "bankday", label: "开户日期", width: '200', align: ''},
    {field: "addr", label: "地址", width: '200', align: ''},
    {field: "zipCd", label: "邮编", width: '200', align: ''},
    {field: "phone", label: "电话号码", width: '200', align: ''},
    {field: "sex", label: "性别", width: '200', align: ''},
    {field: "birthdt", label: "出生日期", width: '200', align: ''},
    {field: "localTaxid", label: "当地纳税号", width: '250', align: ''},
    {field: "localSocialsecurityid", label: "当地社保ID", width: '250', align: ''},
    {field: "localId", label: "当地身份证号", width: '250', align: ''},
    {field: "licenceid", label: "驾照号", width: '200', align: ''},
    {field: "hkMacaoPass", label: "港澳居民来往内地通行证", width: '280', align: ''},
    {field: "workUnit", label: "工作单位", width: '200', align: ''},
    {field: "position", label: "职位", width: '200', align: ''},
    {field: "corpChar", label: "单位性质", width: '200', align: ''},
    {field: "email", label: "电子邮件", width: '200', align: ''},
    {field: "zdxSoloName", label: "指定下单人姓名", width: '200', align: ''},
    {field: "zdxSoloDoctype", label: "指定下单人证件类型", width: '250', align: ''},
    {field: "zdxSoloDocid", label: "指定下单人证件号码", width: '250', align: ''},
    {field: "zdxSoloAddr", label: "指定下单人地址", width: '250', align: ''},
    {field: "zdxSoloZipCd", label: "指定下单人邮编", width: '250', align: ''},
    {field: "fundTranpername", label: "资金调拨人姓名", width: '250', align: ''},
    {field: "fundTranperaddr", label: "资金调拨人地址", width: '250', align: ''},
    {field: "fundTranperzipCd", label: "资金调拨人邮编", width: '250', align: ''},
    {field: "statCfmname", label: "结算单确认人姓名", width: '250', align: ''},
    {field: "statCfmaddr", label: "结算单确认人地址", width: '250', align: ''},
    {field: "statCfmzipCd", label: "结算单确认人邮编", width: '250', align: ''},
    {field: "custOpenmodel", label: "客户开户模式", width: '200', align: ''},
    {field: "oaiName", label: "开户或中介机构名称", width: '260', align: ''},
    {field: "oaiFilingid", label: "开户或中介机构备案号", width: '260', align: ''},


];

// 客户交易信息查询
export const activeNameList = [
    {
        name: '1',
        label: '客户持仓明细',                   // overStoreAnalysis
        tableColumns: [
            {field: "clientId", label: "客户编号", width: '200', align: ''},
            {field: "custName", label: "客户名称", width: '200', align: ''},
            {field: "tradingDay", label: "交易日期", width: '200', align: ''},
            {field: "orgrumentId", label: "合约代码", width: '200', align: ''},
            {field: "posMultiQtty", label: "持多单量", width: '200', align: ''},
            {field: "posBillQtty", label: "持空单量", width: '200', align: ''},
            {field: "positionsum", label: "持仓金额", width: '200', align: ''},
            {field: "margin", label: "保证金", width: '200', align: ''},
            {field: "duemargin", label: "应收保证金", width: '200', align: ''},
            {field: "openprofit", label: "浮动盈亏", width: '200', align: ''},
            {field: "hedgeflag", label: "投机套保标志", width: '200', align: ''},

        ],
        tableData: [],
    },
    {
        label: '客户报单明细',
        name: '2',
        tableColumns: [
            {field: "custCode", label: "客户编号", width: '200', align: ''},
            {field: "custName", label: "客户名称", width: '200', align: ''},
            {field: "tradingDay", label: "交易日", width: '200', align: ''},
            {field: "declDay", label: "报单日期", width: '200', align: ''},
            {field: "reportid", label: "报单编号", width: '200', align: ''},
            {field: "contrCode", label: "合约代码", width: '200', align: ''},
            {field: "declPriceCond", label: "报单价格条件", width: '200', align: ''},
            {field: "buySell", label: "买卖方向", width: '200', align: ''},
            {field: "comHedgeflag", label: "组合投机套保标志", width: '200', align: ''},
            {field: "price", label: "价格", width: '200', align: ''},
            {field: "quantity", label: "数量", width: '200', align: ''},
            {field: "volType", label: "成交量类型", width: '200', align: ''},
            {field: "declType", label: "报单类型", width: '200', align: ''},
            {field: "todayVolQuantity", label: "今成交数量", width: '200', align: ''},
            {field: "residueQuantity", label: "剩余数量", width: '200', align: ''},
            {field: "changeTime", label: "最后修改时间", width: '200', align: ''},
            {field: "cancelTime", label: "撤销时间", width: '200', align: ''},

        ],
        tableData: [],
    }, {
        label: '客户成交明细',
        name: '3',
        tableColumns: [
            {field: "custCode", label: "客户编号", width: '200', align: ''},
            {field: "custName", label: "客户名称", width: '200', align: ''},
            {field: "tranId", label: "成交编号", width: '200', align: ''},
            {field: "buySell", label: "买卖方向", width: '200', align: ''},
            {field: "reportId", label: "报单编号", width: '200', align: ''},
            {field: "tradeRole", label: "交易角色", width: '200', align: ''},
            {field: "contrCode", label: "合约代码", width: '200', align: ''},
            {field: "kaipingFlag", label: "开平标志", width: '200', align: ''},
            {field: "hedgeFlag", label: "投机套保标志", width: '200', align: ''},
            {field: "price", label: "价格", width: '200', align: ''},
            {field: "quantity", label: "数量", width: '200', align: ''},
            {field: "tranday", label: "成交时间", width: '200', align: ''},
            {field: "tranType", label: "成交类型", width: '200', align: ''},

        ],
        tableData: [],
    }
];

// 精确信息查询
export const columnsCTrI3 = [
    {field: "custd", label: "客户编号", width: '200', align: ''},
    {field: "custName", label: "客户名称", width: '200', align: ''},
    {field: "custType", label: "客户类型", width: '200', align: ''},
    {field: "bankSwift", label: "开户银行", width: '200', align: ''},
    {field: "bankIacct", label: "银行帐号", width: '200', align: ''},
    {field: "bankDay", label: "开户日期", width: '200', align: ''},
    {field: "addr", label: "地址", width: '200', align: ''},
    {field: "zipCd", label: "邮编", width: '200', align: ''},
    {field: "phone", label: "电话号码", width: '200', align: ''},
    {field: "sex", label: "性别", width: '200', align: ''},
    {field: "birthdt", label: "出生日期", width: '200', align: ''},
    {field: "localTaxid", label: "当地纳税号", width: '250', align: ''},
    {field: "localSocialsecurityid", label: "当地社保ID", width: '250', align: ''},
    {field: "localId", label: "当地身份证号", width: '250', align: ''},
    {field: "licenceId", label: "驾照号", width: '200', align: ''},
    {field: "hkMacaoPass", label: "港澳居民来往内地通行证", width: '280', align: ''},
    {field: "workUnit", label: "工作单位", width: '200', align: ''},
    {field: "position", label: "职位", width: '200', align: ''},
    {field: "corpChar", label: "单位性质", width: '200', align: ''},
    {field: "email", label: "电子邮件", width: '200', align: ''},
    {field: "zdxSoloName", label: "指定下单人姓名", width: '260', align: ''},
    {field: "zdxSoloDoctype", label: "指定下单人证件类型", width: '280', align: ''},
    {field: "zdxSoloDocid", label: "指定下单人证件号码", width: '280', align: ''},
    {field: "zdxoloddr", label: "指定下单人地址", width: '260', align: ''},
    {field: "zdxoloZipCd", label: "指定下单人邮编", width: '260', align: ''},
    {field: "fundTranpername", label: "资金调拨人姓名", width: '260', align: ''},
    {field: "fundSasTranperaddr", label: "资金调拨人地址", width: '260', align: ''},
    {field: "fundTranperzipCd", label: "资金调拨人邮编", width: '260', align: ''},
    {field: "statCfmname", label: "结算单确认人姓名", width: '280', align: ''},
    {field: "statCfmaddr", label: "结算单确认人地址", width: '280', align: ''},
    {field: "statCfmzipCd", label: "结算单确认人邮编", width: '280', align: ''},
    {field: "custOpenmodel", label: "客户开户模式", width: '200', align: ''},
    {field: "oaiName", label: "开户或中介机构名称", width: '280', align: ''},
    {field: "oaiFilingid", label: "开户或中介机构备案号", width: '280', align: ''}

];

// 指标选择
export const indexSelectionOptions = [
    {value: '1', label: '地址'},
    {value: '2', label: '电话'},
    {value: '3', label: '工作单位'},
    {value: '4', label: '电子邮件'},
];
// 模糊地址查询
export const columnsCTrI4 = [
    {field: "custid", label: "客户编号", width: '200', align: ''},
    {field: "custName", label: "客户名称", width: '200', align: ''},
    {field: "custType", label: "客户类型", width: '200', align: ''},
    {field: "bankSwift", label: "开户银行", width: '200', align: ''},
    {field: "bankAcct", label: "银行帐号", width: '200', align: ''},
    {field: "bankDay", label: "开户日期", width: '200', align: ''},
    {field: "addr", label: "地址", width: '200', align: ''},
    {field: "zipCd", label: "邮编", width: '200', align: ''},
    {field: "phone", label: "电话号码", width: '200', align: ''},
    {field: "sex", label: "性别", width: '200', align: ''},
    {field: "birthdt", label: "出生日期", width: '200', align: ''},
    {field: "localTaxid", label: "当地纳税号", width: '200', align: ''},
    {field: "localSocialsecurityid", label: "当地社保ID", width: '200', align: ''},
    {field: "localId", label: "当地身份证号", width: '200', align: ''},
    {field: "licenceId", label: "驾照号", width: '200', align: ''},
    {field: "hkMacaoPass", label: "港澳居民来往内地通行证", width: '300', align: ''},
    {field: "workUnit", label: "工作单位", width: '200', align: ''},
    {field: "position", label: "职位", width: '200', align: ''},
    {field: "corpChar", label: "单位性质", width: '200', align: ''},
    {field: "email", label: "电子邮件", width: '200', align: ''},
    {field: "zdxSoloName", label: "指定下单人姓名", width: '200', align: ''},
    {field: "zdxSoloDoctype", label: "指定下单人证件类型", width: '260', align: ''},
    {field: "zdxSoloDocid", label: "指定下单人证件号码", width: '260', align: ''},
    {field: "zdxSoloAddr", label: "指定下单人地址", width: '250', align: ''},
    {field: "zdxSoloZipCd", label: "指定下单人邮编", width: '250', align: ''},
    {field: "fundTranpername", label: "资金调拨人姓名", width: '250', align: ''},
    {field: "fundTranperaddr", label: "资金调拨人地址", width: '250', align: ''},
    {field: "fundTranperzipCd", label: "资金调拨人邮编", width: '250', align: ''},
    {field: "statCfmname", label: "结算单确认人姓名", width: '250', align: ''},
    {field: "statCfmaddr", label: "结算单确认人地址", width: '250', align: ''},
    {field: "statCfmzipCd", label: "结算单确认人邮编", width: '250', align: ''},
    {field: "custOpenmodel", label: "客户开户模式", width: '200', align: ''},
    {field: "oaiName", label: "开户或中介机构名称", width: '280', align: ''},
    {field: "oaiFilingid", label: "开户或中介机构备案号", width: '280', align: ''},

];
