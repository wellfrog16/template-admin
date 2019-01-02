
export default {
    data() {
        return {
        };
    },
    methods: {
        getChart() {
            return [this.getChart1, this.getChart2, this.getChart3, this.getChart4];
        },
        drewChart1() {
            setTimeout(() => {
                let respData = this.dealChart1AndMainTableData();
                this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData(respData);
            });
        },
        getChart1(flag, data) {
            setTimeout(() => {
                this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].initChart(flag, data);
            });
        },
        drewChart2(resp) {
            setTimeout(() => {
                this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].getData(resp);
            });
        },
        getChart2(flag, data) {
            setTimeout(() => {
                this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].initChart(flag, data);
            });
        },
        drewChart3(resp) {
            setTimeout(() => {
                this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].getData(resp);
            });
        },
        getChart3(flag, data) {
            setTimeout(() => {
                this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].initChart(flag, data);
            });
        },
        drewChart4(resp) {
            setTimeout(() => {
                this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].getData(resp);
            });
        },
        getChart4(flag, data) {
            setTimeout(() => {
                this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].initChart(flag, data);
            });
        }
    }
};
