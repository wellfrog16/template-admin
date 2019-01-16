
export default {
    data() {
        return {
            timeWindowOptions: [
                // 1 秒、5 秒、1 分 钟、10 分钟，还是 1 天、5 天、1 个月、1
                {
                    idName: '0',
                    name: '1 秒'
                },
                {
                    idName: '1',
                    name: '10 分钟'
                },
                {
                    idName: '2',
                    name: '1 分 钟'
                },
                {
                    idName: '3',
                    name: '1 天'
                },
                {
                    idName: '4',
                    name: '5 天'
                },
                {
                    idName: '5',
                    name: '1 个月'
                },
                {
                    idName: '6',
                    name: '1年'
                },
            ],
            ruleForm: {
                timeWindow: '',
            },
            rules: {
                timeWindow: [
                    {required: true, message: '请选择时间窗口', trigger: 'change'}
                ]
            },
            multipleSelection: [],
            tableData3: [
                {
                    date: '买总量',
                    name: '2000-5000',
                    address: '0.4',
                    addres: '0.5',
                    address1: '上海市普1518 弄',
                    index: 0
                }, {
                    date: '委卖总量',
                    name: '2000-5000',
                    address: '0.5',
                    addres: '0.5',
                    address1: '',
                    index: 1
                }, {
                    date: '平均成交价格',
                    name: '200-500',
                    address: '0.4',
                    addres: '0.5',
                    address1: '',
                    index: 2
                }, {
                    date: '波动率',
                    name: '2%-5%',
                    address: '0.4',
                    addres: '0.5',
                    address1: '',
                    index: 3
                }
            ],
        };
    },
    methods: {
        // 时间窗口
        nationyChenge() {},
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleInsert(val) {
            console.log(val);
        }
    }
};
