import _ from 'lodash';
export default {
    data() {
        return {
        };
    },
    methods: {
        getChart() {
            return [this.getChart1, this.getChart2, this.getChart3, this.getChart4];
        },
        drewChart1(type) {
            setTimeout(() => {
                let respData = this.dealChart1AndMainTableData();
                const {chartData, id} = respData;
                if (type === 1) {
                    let selectMax = _.maxBy(chartData, 'acctGroOpenInt');
                    // select max
                    this.updateAccountGroupAndCustIds(selectMax ? selectMax.acctId : '', selectMax ? selectMax.custIds.split(',') : []);
                } else {
                    this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['value'].split(','));
                }
                setTimeout(() => {
                    this.getBlock2Data();
                    this.getBlock3Data();
                });
                this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData(chartData, id);
            });
        },
        getChart1(data, flag) {
            setTimeout(() => {
                this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].initChart(data, flag);
            });
        },
        drewChart2(resp) {
            setTimeout(() => {
                this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].getData(resp);
            });
        },
        getChart2(data, flag) {
            setTimeout(() => {
                this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].initChart(data, flag);
            });
        },
        drewChart3(resp) {
            setTimeout(() => {
                // 最近交易日，包含买入或卖出
                let selectMax = _.maxBy(resp.mainData, v => {
                    if (!!v.sellAcctCnt || !!v.buyAcctCnt) {
                        return v.txDt;
                    }
                });
                setTimeout(() => {
                    this.getBlock4Data(selectMax ? selectMax.txDt : '2017-06-02');
                });
                this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].getData(resp);
            });
        },
        getChart3(data, flag) {
            setTimeout(() => {
                this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].initChart(data, flag);
            });
        },
        drewChart4(resp) {
            setTimeout(() => {
                this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].getData(resp);
            });
        },
        getChart4(data, flag) {
            setTimeout(() => {
                this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].initChart(data, flag);
            });
        }
    }
};
