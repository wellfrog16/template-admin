// 异常交易分析-- 查询按钮
import {
    postImportAccountGroup,
    postImportAccoun,
    postIInquire
} from '@/api/dataAnsis/abnormityAnalysis';

export default {
    name: 'mixin.js',
    props: [],
    components: {},
    mixins: [],
    data() {
        return { };
    },
    create() {
        // this.getForm();
    },
    methods: {
        // 生成报告(查询)
        generateReportsClick(formName) {

            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });

            let span = {
                "accountTeamNo": "",   // 账户组号
                "custId": "",              // 客户编号
                // "statTimeBegin": "",      // 统计起始日
                // "statTimeEnd": "",        // 统计截止日
            }
            postIInquire(span).then(resp => {
                // overStoreAnalysis ： 超仓分析，
                // frequentTrade : 频繁报撤单，
                // autoTrade：自成交
                // this.activeNameList[index].tableDataList = resp.overStoreAnalysis;
                // this.activeNameList[index].tableDataList = resp.frequentTrade;
                // this.activeNameList[index].tableDataList = resp.autoTrade;
                // this.tableDataList = resp.report;

                console.log(resp.resData.overStoreAnalysis);
            })
        },
    }
};
