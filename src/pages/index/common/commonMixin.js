import _ from 'lodash';
export default {
    data() {
        return {
            propsChartHeight: 300,
            fullscreen: false,
            currentFullScreenIndex: 0,
            limitQtty: ''
        };
    },
    methods: {
        getHasTask() {
            // 调取接口获取是否还是未执行完的任务
            let has = true;
            if (has) {
                this.$confirm('抱歉：您有计算任务进行中，建议当前任务完成后再操作', '提示', {
                    confirmButtonText: '继续执行',
                    cancelButtonText: '取消操作',
                    type: 'warning'
                })
                    .then(() => {
                        // 继续操作
                        return true;
                    }).catch(() => {
                        // 取消继续操作
                        return false;
                    });
            }
            return true;
        },
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
        drewChart1(autoSave) {
            setTimeout(() => {
                let respData = this.dealChart1AndMainTableData();
                let {chartData, id} = respData;
                if (!chartData) {
                    return;
                }
                if (String(this.currentSceneType) === '1') {
                    let selectMax = _.maxBy(chartData, 'acctMakePosQttyMax');
                    // select max
                    this.updateAccountGroupAndCustIds(selectMax ? selectMax.acctId : '', selectMax ? selectMax.custIds.split(',') : []);
                } else if (String(this.currentSceneType) === '3' || String(this.currentSceneType) === '4') {
                    this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['custIds'].split(','));
                }
                setTimeout(() => {
                    if (String(this.currentSceneType) === '2') {
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
                setTimeout(() => {
                    this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData(chartData, id);
                    // 自动导出结果集
                    // if (autoSave) {
                    //     this.handleExportResultCallback(this.currentSceneType, this.tabIndex);
                    // }
                });
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
                        this.getBlock4Data(selectMax ? selectMax.txDt : resp.mainData[0]['txDt']);
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
