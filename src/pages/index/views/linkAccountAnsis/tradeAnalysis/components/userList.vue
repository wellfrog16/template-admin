<template>
    <div class="user-list">
        <el-form label-width="140px;">
            <el-form-item label="时间窗口选择：" style="margin-bottom: 0;">
                <el-checkbox-group v-model="checkedResults" @change="handleCheckedResultsChange">
                    <el-checkbox v-for="(item, index) in eventResults" :key="index" :label="item.value">
                        <span :style="{'background-color': colorMap[item.value]}" class="edge-css"></span>
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="仅显示盈利盘：">
                <el-checkbox v-model="showProfitMargin" @change="handleProfitMarginChange">
                    仅显示盈利盘
                </el-checkbox>
            </el-form-item>
            <el-form-item label="批量查看操作：">
                <el-button type="primary" size="mini" @click="showStaticInfo">静态信息</el-button>
                <el-button type="primary" size="mini" @click="showGraphMap">用户关系推理</el-button>
                <el-button type="primary" size="mini" @click="showTradeDetail">交易明细</el-button>
                <el-button type="primary" size="mini" @click="showTagsCloud">标签词云</el-button>
                <el-button type="primary" size="mini" @click="showTagsStatistics">标签统计</el-button>
                <el-button type="primary" size="mini" @click="exportAnalysis">生成异常行为分析</el-button>
            </el-form-item>

        </el-form>
        <s-table ref="userList" :columns="userListColumns" :tableData="userList" :showSelectionColumn="true" @selection-change="handleSelectChange" :rowStyle="rowStyle"><!--  :rowStyle="rowStyle" -->
            <el-table-column
                :width="90"
                align="center"
                slot="tableColumnsPush"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="modifyTags(scope.row)">修改标签</el-button>
                </template>
            </el-table-column>
        </s-table>
        <el-dialog title="静态信息" :close-on-click-modal="false" :close-on-press-escape="false" :visible="staticInfoDialog" @close="staticInfoDialog = false" width="85%">
            <s-table :height="200" :loading="loadingStaticInfo" :columns="staticInfoColumns" :tableData="staticInfoTableData"></s-table>
        </el-dialog>
        <el-dialog title="关系推理图谱" :close-on-click-modal="false" :close-on-press-escape="false" :visible="graphMapDialog" @close="graphMapDialog = false" width="85%">
            <reasoning-map v-loading="loading" :chartData="graphMapData"></reasoning-map>
        </el-dialog>
        <el-dialog title="交易明细" :close-on-click-modal="false" :close-on-press-escape="false" :visible="tradeDetailDialog" @close="tradeDetailDialog = false" width="85%">
            <s-table :loading="loadingTradeDetail" :columns="tradeDetailColumns" :tableData="tradeDetailTableData"></s-table>
        </el-dialog>
        <el-dialog title="事件标签词云" :close-on-click-modal="false" :close-on-press-escape="false" :visible="tagCloudDialog" @close="tagCloudDialog = false" width="85%">
            <word-cloud v-loading="loading" :data="tagsCloudData"></word-cloud>
        </el-dialog>
        <el-dialog v-loading="loading" title="修改标签" :close-on-click-modal="false" :close-on-press-escape="false" :visible="modifyTagsDialog" @close="modifyTagsDialog = false" width="85%">
            <div>
                <el-row style="line-height: 40px;">
                    <el-col :span="2">事件标签：</el-col>
                    <el-col :span="22">
                        <el-tag closable size="small" type="warning" v-for="(item, index) in currentItem.eventTags" :key="index" @close="handleCloseTag(item, 0)">{{ item.name }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="line-height: 40px;">
                    <el-col :span="2">新增标签：</el-col>
                    <el-col :span="22">
                        <el-form :model="addTagForm" label-width="130px;" :inline="true">
                            <el-form-item label="标签类型">
                                <el-select v-model="addTagForm.tagType" size="small" style="width: 150px;">
                                    <el-option v-for="(item, index) in tagTypes" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标签名称">
                                <el-input
                                    style="width: 150px;"
                                    v-model="addTagForm.tagName"
                                    ref="saveTagInput"
                                    size="small"
                                >
                                </el-input>
                                <el-button size="small" type="primary" @click="confirmCreateNewTag" style="margin-left: 5px;">新增标签</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- <div style="text-align: center;">
                    <el-button size="small" type="warning" @click="handleConfirmModifyTags">确定</el-button>
                    <el-button size="small" @click="modifyTagsDialog=false">取消</el-button>
                </div> -->
            </div>
        </el-dialog>
        <el-dialog title="标签统计" :close-on-click-modal="false" :close-on-press-escape="false" :visible="showTagsStatisticsDialog" @close="showTagsStatisticsDialog = false" width="85%">
            <tags-statistics v-loading="loading" :data="tagsTatisticData"></tags-statistics>
        </el-dialog>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import reasoningMap from '../../unusualAnalysis/components/reasoningMap';
import wordCloud from '../../unusualAnalysis/components/wordCloud';
import tagsStatistics from './tagsStatistics';
import {userListColumns, staticInfoColumns, tradeDetailColumns} from './constants';
// import {postCustomerAddress} from '@/api/dataAnsis/customerInformationInquiry';// postCustomerTransactions
import {queryStaticInfo, queryTradeInfo, queryTagsCloud, queryTagsTatistic, updateUserTags, queryUserRelation} from '@/api/tradeAnalysis';
export default {
    components: {
        STable,
        reasoningMap,
        wordCloud,
        tagsStatistics
    },
    props: {
        propsUserList: {
            type: Array,
            default() {
                return [];
            }
        },
        ruleForm: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    watch: {
        propsUserList: {
            handler(val) {
                this.userList = JSON.parse(JSON.stringify(val));
            },
            deep: true
        }
    },
    data() {
        return {
            userListColumns,
            staticInfoColumns,
            tradeDetailColumns,
            loading: false,
            userList: [
                {eventTimeRange: 0, custId: '80002930', qtty: '8776', prftF: '否', custName: '***', eventLabel: '0|test', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 1, custId: '80002931', qtty: '7422', prftF: '是', custName: '***', eventLabel: '0|hhaf', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 2, custId: '80002932', qtty: '9211', prftF: '否', custName: '***', eventLabel: 'aefsfs', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 0, custId: '80002933', qtty: '1123', prftF: '是', custName: '***', eventLabel: '1|fefa', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 1, custId: '80002934', qtty: '2221', prftF: '是', custName: '***', eventLabel: '0|ffsb', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
            ],
            allUserList: [
                {eventTimeRange: 0, custId: '80002930', qtty: '8776', prftF: '否', custName: '***', eventLabel: '0|test', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 1, custId: '80002931', qtty: '7422', prftF: '是', custName: '***', eventLabel: '0|hhaf', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 2, custId: '80002932', qtty: '9211', prftF: '否', custName: '***', eventLabel: 'aefsfs', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 0, custId: '80002933', qtty: '1123', prftF: '是', custName: '***', eventLabel: '1|fefa', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
                {eventTimeRange: 1, custId: '80002934', qtty: '2221', prftF: '是', custName: '***', eventLabel: '0|ffsb', txStyleLabel: 'fssf,afe,fefe,fef', modelLabel: 'ad,fef,ee,wer', hEventLabel: 'sdf,fe,gt,gs', extLabel: 'ev,ew,dg,gr'},
            ],
            staticInfoDialog: false,
            graphMapDialog: false,
            tradeDetailDialog: false,
            tagCloudDialog: false,
            showTagsStatisticsDialog: false,
            modifyTagsDialog: false,
            loadingStaticInfo: false,
            loadingTradeDetail: false,
            staticInfoTableData: [],
            graphMapData: [],
            tagsCloudData: [],
            tagsTatisticData: [],
            tradeDetailTableData: [],
            currentItem: {},
            checkedResults: [0, 1, 2],
            eventResults: [
                {value: 0, label: '观察起始时间--事件起始时间'},
                {value: 1, label: '事件起始时间--事件结束时间'},
                {value: 2, label: '事件结束时间--观察结束时间'},
            ],
            selectionArray: [], // 选择事件列表
            addTagForm: {
                tagName: '',
                tagType: ''
            },
            tagTypes: [
                {value: '0', label: '内因'},
                {value: '1', label: '外因'},
            ],
            colorMap: ['#ec6e6e', '#f7f01b', '#1bf772'],
            showProfitMargin: false
        };
    },
    methods: {
        computedParams() {
            return {
                ...this.ruleForm,
                custId: this.selectionArray.map(v => { return v.custId; }).join(',')
            };
        },
        showStaticInfo() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.staticInfoDialog = true;
            // get static info
            this.loadingStaticInfo = true;
            queryStaticInfo(this.computedParams()).then(resp => {
                if (resp) {
                    this.loadingStaticInfo = false;
                    this.staticInfoTableData = resp;
                } else {
                    this.loadingStaticInfo = false;
                    return [];
                }
            }).catch(e => {
                this.loadingStaticInfo = false;
            });
        },
        showGraphMap() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.graphMapDialog = true;
            this.loading = true;
            queryUserRelation(this.computedParams()).then(resp => {
                this.loading = false;
                if (resp) {
                    this.graphMapData = resp.txRelationAnalyTblList;
                }
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        showTradeDetail() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.tradeDetailDialog = true;
            this.loadingTradeDetail = true;
            queryTradeInfo(this.computedParams()).then(resp => {
                if (resp) {
                    this.loadingTradeDetail = false;
                    this.tradeDetailTableData = resp.txRelationAnalyTblList;
                } else {
                    this.loadingTradeDetail = false;
                    return [];
                }
            }).catch(e => {
                this.loadingTradeDetail = false;
            });
        },
        showTagsCloud() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.tagCloudDialog = true;
            this.loading = true;
            queryTagsCloud(this.computedParams()).then(resp => {
                this.loading = false;
                if (resp) {
                    this.tagsCloudData = resp.txRelationAnalyTblList.map(v => {
                        return {
                            name: v.labelName,
                            value: v.qtty
                        };
                    });
                }
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        showTagsStatistics() {
            // if (!this.selectionArray.length) {
            //     this.$message.error('请先选择用户');
            //     return;
            // }
            this.showTagsStatisticsDialog = true;
            this.loading = true;
            queryTagsTatistic(this.computedParams()).then(resp => {
                this.loading = false;
                if (resp) {
                    this.tagsTatisticData = resp.txRelationAnalyTblList;
                }
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        modifyTags(item) {
            this.modifyTagsDialog = true;
            this.currentItem = JSON.parse(JSON.stringify(item));
            let tags = item.eventLabel.split(',');
            console.log(tags);
            this.currentItem.eventTags = tags.map(v => {
                return {
                    type: v.split('|')[0],
                    name: v.split('|')[1]
                };
            });
        },
        handleCloseTag(item, type) {
            switch (type) {
            case 0:
                this.currentItem.eventTags.splice(this.currentItem.eventTags.indexOf(item), 1);
                break;
            case 1:
                this.currentItem.txStyleLabel.splice(this.currentItem.txStyleLabel.indexOf(item), 1);
                break;
            case 2:
                this.currentItem.modelLabel.splice(this.currentItem.modelLabel.indexOf(item), 1);
                break;
            case 3:
                this.currentItem.hEventLabel.splice(this.currentItem.hEventLabel.indexOf(item), 1);
                break;
            case 4:
                this.currentItem.extLabel.splice(this.currentItem.extLabel.indexOf(item), 1);
                break;
            }
        },
        handleSelectChange(selectionArray) {
            this.selectionArray = selectionArray;
        },
        confirmCreateNewTag() {
            if (!this.addTagForm.tagType) {
                this.$message.error('请选择标签类型');
                return;
            }
            if (!this.addTagForm.tagName) {
                this.$message.error('请输入标签名称');
                return;
            }
            this.currentItem.eventTags.push({
                type: this.addTagForm.tagType,
                name: this.addTagForm.tagName,
            });

            let params = this.computedParams();
            params.eventLabel = this.currentItem.eventTags.map(v => {
                return v.type + '|' + v.name;
            }).join(',');
            updateUserTags(params).then(resp => {
                if (resp) {
                    this.$emit('updateUserList');
                }
            });
        },
        handleConfirmModifyTags() {
            this.$message.success('修改成功');
            this.modifyTagsDialog = false;
        },
        rowStyle({row}) {
            return {color: this.colorMap[row.eventTimeRange]};
            // return {color: this.colorMap[row.eventTimeRange], display: this.checkedResults.indexOf(row.eventTimeRange) > -1 ? '' : 'none'};
        },
        handleCheckedResultsChange(checkedArray) {
            this.userList = this.allUserList.filter(item => {
                return this.checkedResults.indexOf(item.eventTimeRange) > -1 && (this.showProfitMargin ? item.prftF === '是' : true);
            });
        },
        handleProfitMarginChange(val) {
            if (val) {
                this.userList = this.allUserList.filter(item => {
                    return this.checkedResults.indexOf(item.eventTimeRange) > -1 && item.prftF === '是';
                });
            } else {
                this.userList = JSON.parse(JSON.stringify(this.allUserList));
            }
        },
        exportAnalysis() {

        }
    }
};
</script>
<style lang="less" scoped>
.user-list {
    .edge-css {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        line-height: 35px;
    }
}
</style>
