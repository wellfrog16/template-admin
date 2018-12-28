<template>
    <div class="asso-account-group-merge" v-loading="fullLoading">
        <div class="top-nav">
            <el-tabs type="card" v-model="activeTab" @tab-click="handleTabClick" v-if="sceneNameList.length && sceneNameList[0].sceneNames">
                <el-tab-pane v-for="(item, index) in sceneNameList" :key="index" :name="String(item.sceneIds)" :label="item.sceneNames">
                </el-tab-pane>
            </el-tabs>
            <div class="tabs-button">
                <el-row>
                    <span style="margin-right: 10px;">导入结果集：</span>
                    <resultSelectComponent ref="resultSelectComponent" :filterTypes="5" :resultIdProps="resultIds" @selectResultId="selectResultId" @getResultList="getResultList"></resultSelectComponent>
                    <el-button size="mini" type="primary" style="margin-left:5px;" @click="handleImport" :loading="fullLoading">确定</el-button>
                </el-row>
            </div>
        </div>
        <div v-for="(item, index) in sceneNameList" :key="index">
            <sceneType1 ref="sceneType1" v-if="String(item.sceneTypes) === '1' && String(item.sceneIds) === activeTab" :tabIndex="item.sceneIds" @updateFullLoading="updateFullLoading" @updateResultList="updateResultList"></sceneType1>
            <sceneType2 ref="sceneType2" v-if="String(item.sceneTypes) === '2' && String(item.sceneIds) === activeTab" :tabIndex="item.sceneIds" @updateFullLoading="updateFullLoading" @updateResultList="updateResultList"></sceneType2>
            <sceneType3 ref="sceneType3" v-if="String(item.sceneTypes) === '3' && String(item.sceneIds) === activeTab" :tabIndex="item.sceneIds" @updateFullLoading="updateFullLoading" @updateResultList="updateResultList"></sceneType3>
            <sceneType4 ref="sceneType4" v-if="String(item.sceneTypes) === '4' && String(item.sceneIds) === activeTab" :tabIndex="item.sceneIds" @updateFullLoading="updateFullLoading" @updateResultList="updateResultList"></sceneType4>
        </div>
        <div style="text-align:center; margin: 20px 0;">
            <el-button size="small" type="primary" style="width: 100px;" @click="nextStep">下一步</el-button>
        </div>
    </div>
</template>
<script>
import ResultSelectComponent from '@/components/index/common/ResultSelectComponent';
import {
    getExportResultSet
} from '@/api/dataAnsis/assoAccountGroupMerge';
import {getInfoByResultId} from '@/api/common';
import sceneType1 from './assoAccountGroupMergeXG/Index';
import sceneType2 from './assoAccountGroupMergeBV/Index';
import sceneType3 from './assoAccountGroupMergeBI/Index';
import sceneType4 from './assoAccountGroupMergeRL/Index';
export default {
    components: {sceneType1, sceneType2, sceneType3, sceneType4, ResultSelectComponent},
    data() {
        return {
            fullLoading: false,
            sceneCommitParams: {},
            activeTab: '0',
            resultIds: '',
            exportResultType: '1',
            sceneNameList: [{sceneNames: '', sceneTypes: 1, sceneIds: 0}] // [{name: '场景1', type: 1}, {name: '场景2', type: 2}, {name: '场景3', type: 3}, {name: '场景4', type: 4}] // [{name: '', type: 1}]
        };
    },
    watch: {
        '$store.getters.sceneCommitParams': {
            handler(val) {
                this.getSceneNameList(val, () => {
                    this.$store.commit('saveTabIndex', this.resultIds);
                    let sceneCommitParams = this.$store.getters.sceneCommitParams;
                    console.log(this.$store.getters.sceneCommitParams);
                    this.activeTab = this.resultIds || Object.keys(sceneCommitParams)[0];
                });
            },
            deep: true
        }
    },
    methods: {
        updateFullLoading(loading) {
            this.fullLoading = loading;
        },
        updateResultList() {
            this.$refs['resultSelectComponent'].getResultList();
        },
        selectResultId(val, name, type) {
            this.resultIds = val;
            this.exportResultType = type;
        },
        getResultList(list) {
            setTimeout(() => {
                // let sceneCommitParams = this.$store.getters.sceneCommitParams;
                // this.resultIds = sceneCommitParams.resultIds || '';
            });
        },
        handleImport() {
            // 导入结果集
            this.sceneNameList = [{sceneNames: '', sceneTypes: this.exportResultType, sceneIds: 0}];
            this.activeTab = '0';
            this.fullLoading = true;
            getInfoByResultId(this.resultIds).then(resp => {
                this.$refs['sceneType1'][0].computedCommonReqParams = {
                    sceneNames: resp.resultName,
                    sceneIds: this.resultId,
                    acctId: '', // || 'XG00001',
                    custId: '', // || '80001716,80000025,80001461',
                    statStartDt: resp.statStartDt, // || '2017-02-20',
                    statStopDay: resp.statStopDay, // || '2017-10-09',
                    contrCd: resp.contrCd, // || 'cu1712'
                };
                let obj = {};
                obj[this.resultIds] = {
                    sceneNames: resp.resultName,
                    sceneIds: this.resultIds,
                    sceneTypes: this.exportResultType,
                    resultIds: this.resultIds,
                    statStartDt: resp.statStartDt,
                    statStopDay: resp.statStopDay,
                    contrCd: resp.contrCd,
                    statFreq: resp.statFreq
                };
                let store = this.$store.getters.sceneCommitParams;
                store = {...store, ...obj};
                this.$store.commit('saveSceneCommitParams', store);
                getExportResultSet({resultIds: this.resultIds}).then(resp => {
                    this.fullLoading = false;
                    this.$store.commit('saveSceneCommitResp', resp);
                    this.$store.commit('saveTabIndex', this.resultIds);
                    this.$nextTick(() => {
                        this.$refs['sceneType1'] && this.$refs['sceneType1'][0].drewChart1();
                    });
                });
            });
        },
        handleTabClick(tab) {
            this.activeTab = tab.name;
            this.$store.commit('saveActiveTab', tab.id);
        },
        nextStep() {
            this.$router.push({name: 'abnormity'});
        },
        resetDetailFlag() {
            this.charts.forEach(v => {
                v.toggleDetailFlags = false;
            });
        },
        getSceneNameList(sceneCommitParams, callback) {
            this.sceneNameList = [];
            Object.keys(sceneCommitParams).forEach(f => {
                this.sceneNameList.push(sceneCommitParams[f]);
            });
            callback && callback();
        }
    },
    mounted() {
        let sceneCommitParams = this.$store.getters.sceneCommitParams;
        if (sceneCommitParams && Object.keys(sceneCommitParams).length) {
            this.getSceneNameList(sceneCommitParams, () => {
                this.$store.commit('saveTabIndex', Object.keys(sceneCommitParams)[0]);
            });
            this.activeTab = Object.keys(sceneCommitParams)[0];
        }
    },
    beforeDestroy() {
        this.$store.commit('saveSceneCommitParams', {});
    }
};
</script>
<style lang="less" scoped>
    .asso-account-group-merge {
        background: transparent;
        .top-nav {
            position: relative;
            min-height: 56px;
        }
        .tabs-button {
            position: absolute;
            right: 0;
            top: 0;
        }
        .custom-width {
            width: 350px;
        }
    }
</style>
