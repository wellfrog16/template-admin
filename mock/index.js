const Mock = require('mockjs');

module.exports = app => {
    app.get('/mock/list/', (req, mase, res) => {
        const data = Mock.mock({
            'total': 10,
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|10-20': [{
                'id|+1': 1,
                'name': '@cname',
                'title': '@ctitle(15, 20)',
                'status': '@pick(["审核", "预申请", "转正", "正式", "已取消"])',
                'date': '@date',
                'price': '@float(-100000000, 100000000, 6, 6)'
            }]
        });
        res.json({code: 200, data});
    });
    app.get('/mock/test/', (req, res) => {
        const data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'mainData|10-20': [{
                'id|+1': 1,
                'txDt': '@date',
                'openQuotPrice': '@float(-100000000, 100000000, 6, 6)',
                'closeQuotPrice': '@float(-100000000, 100000000, 6, 6)',
                'highestPrice': '@float(-100000000, 100000000, 6, 6)',
                'lowestPrice': '@float(-100000000, 100000000, 6, 6)',
                'sellAcctCnt|+1': 1,
                'buyAcctCnt|+1': 9,
            }],
            'tableData': []
        });
        res.json({code: 200, data});
    });
};
