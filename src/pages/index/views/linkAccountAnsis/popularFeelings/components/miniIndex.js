import {
    postConfigurationQuery1,
    postConfigurationModification1,
    postConfigurationQuery3,
    postConfigurationModification3
} from '@/api/dataAnsis/popularFeelings';
export default {
    data() {
        return {
            timeWindowOptions: [
                // 1 秒、5 秒、1 分 钟、10 分钟，还是 1 天、5 天、1 个月、1
                {
                    idName: '0',
                    name: '5 分钟'
                },
                {
                    idName: '1',
                    name: '10 分钟'
                },
                {
                    idName: '2',
                    name: '15 分 钟'
                },
            ],
            dtaWindowOptions: [
                // 1 秒、5 秒、1 分 钟、10 分钟，还是 1 天、5 天、1 个月、1
                {
                    idName: '1',
                    name: '1 天'
                },
                {
                    idName: '2',
                    name: '5 天'
                },
                {
                    idName: '3',
                    name: '15 天'
                }
            ],
            rules: {
                timeWindow: [
                    {required: true, message: '请选择时间窗口', trigger: 'change'}
                ]
            },
        };
    },
    methods: {
        // 美油日分时图--配置表
        tableData1List() {
            let params = {
            };
            postConfigurationQuery1(params).then(resp => {
                this.tableData1 = resp;
                this.tableData2 = resp;
            });
        },
        // 美油日分时图--修改配置表
        tableUpdateData1(val) {
            postConfigurationModification1(val).then(resp => {
                // this.$message.success('成功');
                return resp;
            });
        },
        // 原油日K图--配置表
        tableData3List() {
            let params = {
            };
            postConfigurationQuery3(params).then(resp => {
                let respVale = [];
                resp.forEach(v => {
                    if (v.referenceValueMax || v.referenceValueMin) {
                        let resData = {
                            indexName: v.indexName,
                            reference: v.referenceValueMin + '-' + v.referenceValueMax,
                            weight: v.weight,
                            threshold: v.threshold
                        };
                        respVale.push(resData);
                    }
                });
                // console.log(respVale);
                this.tableData1 = resp;
                this.tableData2 = resp;
                this.tableData3 = resp;
                this.tableData4 = resp;
            });
        },
        // 原油日K图--修改配置表
        tableUpdateData(val) {
            postConfigurationModification3(val).then(resp => {
                return resp;
            });
        },
    },
    mounted() {
    },
};
