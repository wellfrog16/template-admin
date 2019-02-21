import _ from 'lodash';
export default {
    data() {
        return {
            propsChartHeight: 300,
            fullscreen: false,
            currentFullScreenIndex: 0
        };
    },
    methods: {
        toggleFullScreen(index) {
            this.$refs['fullscreen'][index].toggle();
            this.currentFullScreenIndex = index;
        },
        fullscreenChange(fullscreen) {
            this.fullscreen = fullscreen;
            this.$nextTick(() => {
                if (fullscreen) {
                    let wh = window.innerHeight * 0.9;
                    this.propsChartHeight = wh;
                } else {
                    this.propsChartHeight = 300;
                }
                this.$refs[`chartComponent${this.currentFullScreenIndex + 1}`][0].$refs[`chart${this.currentFullScreenIndex}`].echart.resize();
            });
        },
        getChart() {
            return [this.getChart1, this.getChart2, this.getChart3, this.getChart4];
        },
        drewChart1(type) {
            setTimeout(() => {
                let respData = this.dealChart1AndMainTableData();
                let {chartData, id} = respData;
                if (!chartData) {
                    return;
                }
                if (type === 1) {
                    let selectMax = _.maxBy(chartData, 'acctMakePosQttyMax');
                    // select max
                    this.updateAccountGroupAndCustIds(selectMax ? selectMax.acctId : '', selectMax ? selectMax.custIds.split(',') : []);
                } else {
                    this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['custIds'].split(','));
                }
                setTimeout(() => {
                    if (this.currentSceneType === '2') {
                        this.getDetailBy3D();
                    } else {
                        this.getBlock2Data();
                        this.getBlock3Data();
                    }
                });
                if (this.currentSceneType === '4') {
                    let chartDataList = respData.chartDataList;
                    chartData.nodes.forEach(v => {
                        let index = chartDataList.findIndex(i => {
                            return i.acctId === v.name;
                        });
                        const {sameInvestMger, sameInvestConsu, sameRaiHoldPerson} = chartDataList[index];
                        if (sameInvestMger === '是' || sameInvestConsu === '是' || sameRaiHoldPerson === '是') {
                            v.category = 0;
                        } else {
                            v.category = 1;
                        }
                    });
                } else if (this.currentSceneType === '3') {
                    let chartDataList = respData.chartDataList;
                    chartData.nodes.forEach(v => {
                        let index = chartDataList.findIndex(i => {
                            return i.acctId === v.name;
                        });
                        const {contTelSame, idtfyCertSame, contAddrSame} = chartDataList[index];
                        if (contTelSame === '是' || idtfyCertSame === '是' || contAddrSame === '是') {
                            v.category = 0;
                        } else {
                            v.category = 1;
                        }
                    });
                }
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
                    if (this.currentSceneType !== '2') {
                        this.getBlock4Data(selectMax ? selectMax.txDt : '2017-06-02');
                    }
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
