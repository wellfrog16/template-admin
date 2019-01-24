<template>
    <div class="asso-account-group-merge" v-loading="fullLoading">
        <div class="top-nav">
            <el-tabs type="card" closable v-model="activeTab" @tab-click="handleTabClick" v-if="sceneNameList.length && sceneNameList[0].sceneNames" @tab-remove="removeTab">
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
        <!-- <div>
            <el-button v-for="(c, i) in color" :key="i" :style="{'background': c}">测试</el-button>
        </div> -->
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
            color: [
                '#f8f400',
                '#40f3d6',
                '#ce20ff',
                '#13ce34',
                '#ff8a00',
                '#e3007b',
                '#1929b3',
                '#b69913',
                '#00709e',
                '#006624',
                '#4f1692',
                '#b9cc87',
                '#ffabf3',
                '#f3253c',
                '#18414c',
                '#dbef09',
                '#791e06',
                '#09beef'],
            fullLoading: false,
            sceneCommitParams: {},
            activeTab: '0',
            resultIds: '',
            exportResultType: '1',
            sceneNameList: [{sceneNames: '', sceneTypes: 1, sceneIds: 0}]
        };
    },
    watch: {
        '$store.getters.sceneCommitParams': {
            handler(val) {
                this.getSceneNameList(val, () => {
                    // this.$store.commit('saveTabIndex', this.resultIds);
                    let sceneCommitParams = this.$store.getters.sceneCommitParams;
                    this.activeTab = 0; // switch to update data
                    this.activeTab = this.resultIds || Object.keys(sceneCommitParams)[0];
                    console.log(this.activeTab);
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
            if (!this.resultIds) {
                this.$message.error('请先选择一个结果集');
                return;
            }
            if (this.sceneNameList && this.sceneNameList.length > 4) {
                this.$message.error('暂时只支持同时操作四个场景类型');
                return;
            }
            // 导入结果集
            this.fullLoading = true;
            getInfoByResultId(this.resultIds, this.exportResultType).then(resp => {
                let resultName = resp.resultName || resp.resultSetName;
                this.sceneNameList.push({sceneNames: resultName, sceneTypes: this.exportResultType, sceneIds: this.resultIds});
                this.activeTab = this.resultIds;
                let params = {
                    sceneNames: resultName,
                    sceneIds: this.resultIds,
                    acctId: '', // || 'XG00001',
                    custId: '', // || '80001716,80000025,80001461',
                    statStartDt: resp.statStartDt, // || '2017-02-20',
                    statStopDay: resp.statStopDay, // || '2017-10-09',
                    contrCd: resp.contrCd, // || 'cu1712'
                    id: this.resultIds
                };
                if (String(this.exportResultType) === '1') {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.$refs['sceneType1'][0].computedCommonReqParams = params;
                        });
                    });
                } else if (String(this.exportResultType) === '3') {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.$refs['sceneType3'][0].computedCommonReqParams = params;
                        });
                    });
                } else if (String(this.exportResultType) === '4') {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.$refs['sceneType4'][0].computedCommonReqParams = params;
                        });
                    });
                }
                let obj = {};
                obj[this.resultIds] = {
                    sceneNames: resultName,
                    sceneIds: this.resultIds,
                    sceneTypes: this.exportResultType,
                    resultIds: this.resultIds,
                    statStartDt: resp.statStartDt,
                    statStopDay: resp.statStopDay,
                    contrCd: resp.contrCd,
                    statFreq: resp.statFreq,
                    id: this.resultIds
                };
                let store = this.$store.getters.sceneCommitParams;
                store = {...store, ...obj};
                this.$store.commit('saveSceneCommitParams', store);
                getExportResultSet({resultIds: this.resultIds, resultType: this.exportResultType}).then(resp => {
                    this.fullLoading = false;
                    let store = this.$store.getters.sceneCommitResp;
                    store[this.resultIds] = resp;
                    this.$store.commit('saveSceneCommitResp', store);
                    this.$store.commit('saveTabIndex', this.resultIds);
                    this.$nextTick(() => {
                        let flag = String(this.exportResultType) === '1' ? 1 : null;
                        if (String(this.exportResultType) === '1') {
                            this.$refs['sceneType1'] && this.$refs['sceneType1'][0].drewChart1(flag);
                        } else if (String(this.exportResultType) === '3') {
                            this.$refs['sceneType3'] && this.$refs['sceneType3'][0].drewChart1(flag);
                        } else if (String(this.exportResultType) === '4') {
                            this.$refs['sceneType4'] && this.$refs['sceneType4'][0].drewChart1(flag);
                        }
                    });
                }).catch(e => {
                    this.fullLoading = false;
                    console.error(e);
                });
            }).catch(e => {
                this.fullLoading = false;
                console.error(e);
            });
        },
        handleTabClick(tab) {
            this.activeTab = tab.name;
            this.$store.commit('saveTabIndex', tab.name);
            this.$store.commit('saveClickTab', true);
        },
        nextStep() {
            this.$confirm('离开本页面信息将丢失，是否确定离开?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$router.push({name: 'multipleScenesMerge'});
                });
        },
        resetDetailFlag() {
            this.charts.forEach(v => {
                v.toggleDetailFlags = false;
            });
        },
        getSceneNameList(sceneCommitParams, callback) {
            console.log(sceneCommitParams);
            let sceneNameList = [];
            Object.keys(sceneCommitParams).forEach(f => {
                if (sceneCommitParams[f].sceneNames) {
                    sceneNameList.push(sceneCommitParams[f]);
                }
            });
            this.sceneNameList = sceneNameList;
            console.log(this.sceneNameList);
            callback && callback();
        },
        removeTab(targetName) {
            let tabs = this.sceneNameList;
            if (tabs.length === 1) {
                this.$message.error('至少有一个场景');
                return;
            }
            let activeName = this.activeTab;
            let nextTab = null;
            if (String(activeName) === String(targetName)) {
                tabs.forEach((tab, index) => {
                    if (String(tab.sceneIds) === String(targetName)) {
                        nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.sceneIds;
                        }
                    }
                });
            }
            let store = this.$store.getters.sceneCommitParams;
            let newArray = {};
            for (let key in store) {
                if (String(key) !== String(targetName)) {
                    newArray[key] = store[key];
                }
            }
            console.log(newArray);
            this.$store.commit('saveSceneCommitParams', newArray);
            this.sceneNameList = tabs.filter(tab => String(tab.sceneIds) !== String(targetName));
            console.log(this.sceneNameList);
            this.activeTab = activeName;
            this.resultIds = activeName;
        }
    },
    mounted() {
        // 用于是否取缓存数据
        this.$store.commit('saveClickTab', false);
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
