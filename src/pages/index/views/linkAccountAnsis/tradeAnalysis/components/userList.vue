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
            <el-form-item label="批量查看操作：">
                <el-button type="primary" size="mini" @click="showStaticInfo">静态信息</el-button>
                <el-button type="primary" size="mini" @click="showGraphMap">用户关系推理</el-button>
                <el-button type="primary" size="mini" @click="showTradeDetail">交易明细</el-button>
                <el-button type="primary" size="mini" @click="showTagsCloud">标签词云</el-button>
            </el-form-item>
        </el-form>
        <s-table ref="userList" :columns="userListColumns" :tableData="userList" :showSelectionColumn="true" @selection-change="handleSelectChange" :rowStyle="rowStyle">
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
            <reasoning-map></reasoning-map>
        </el-dialog>
        <el-dialog title="交易明细" :close-on-click-modal="false" :close-on-press-escape="false" :visible="tradeDetailDialog" @close="tradeDetailDialog = false" width="85%">
            <s-table :loading="loadingTradeDetail" :columns="tradeDetailColumns" :tableData="tradeDetailTableData"></s-table>
        </el-dialog>
        <el-dialog title="标签词云" :close-on-click-modal="false" :close-on-press-escape="false" :visible="tagCloudDialog" @close="tagCloudDialog = false" width="85%">
            <word-cloud></word-cloud>
        </el-dialog>
        <el-dialog title="修改标签" :close-on-click-modal="false" :close-on-press-escape="false" :visible="modifyTagsDialog" @close="modifyTagsDialog = false" width="85%">
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
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import reasoningMap from '../../unusualAnalysis/components/reasoningMap';
import wordCloud from '../../unusualAnalysis/components/wordCloud';
import {userListColumns, staticInfoColumns, tradeDetailColumns} from './constants';
import {postCustomerAddress} from '@/api/dataAnsis/customerInformationInquiry';// postCustomerTransactions
export default {
    components: {
        STable,
        reasoningMap,
        wordCloud
    },
    data() {
        return {
            userListColumns,
            staticInfoColumns,
            tradeDetailColumns,
            userList: [
                {eventTimeRange: 0, custId: '80002930', qtty: '8776', custName: '***', eventTags: [{name: '频繁报撤单', type: 2}], tradeTags: [{name: 'afas', type: 2}], modelTags: [{name: 'aerv', type: 2}], hisEventTags: [{name: 'iioe', type: 2}], outTags: [{name: 'ibnww', type: 2}]},
                {eventTimeRange: 1, custId: '80002931', qtty: '7422', custName: '***', eventTags: [{name: '频繁报撤单', type: 2}], tradeTags: [{name: 'afas', type: 2}], modelTags: [{name: 'aerv', type: 2}], hisEventTags: [{name: 'iioe', type: 2}], outTags: [{name: 'ibnww', type: 2}]},
                {eventTimeRange: 2, custId: '80002932', qtty: '9211', custName: '***', eventTags: [{name: '频繁报撤单', type: 2}], tradeTags: [{name: 'afas', type: 2}], modelTags: [{name: 'aerv', type: 2}], hisEventTags: [{name: 'iioe', type: 2}], outTags: [{name: 'ibnww', type: 2}]},
                {eventTimeRange: 0, custId: '80002933', qtty: '1123', custName: '***', eventTags: [{name: '频繁报撤单', type: 2}], tradeTags: [{name: 'afas', type: 2}], modelTags: [{name: 'aerv', type: 2}], hisEventTags: [{name: 'iioe', type: 2}], outTags: [{name: 'ibnww', type: 2}]},
                {eventTimeRange: 1, custId: '80002934', qtty: '2221', custName: '***', eventTags: [{name: '频繁报撤单', type: 2}], tradeTags: [{name: 'afas', type: 2}], modelTags: [{name: 'aerv', type: 2}], hisEventTags: [{name: 'iioe', type: 2}], outTags: [{name: 'ibnww', type: 2}]},
            ],
            staticInfoDialog: false,
            graphMapDialog: false,
            tradeDetailDialog: false,
            tagCloudDialog: false,
            modifyTagsDialog: false,
            loadingStaticInfo: false,
            loadingTradeDetail: false,
            staticInfoTableData: [],
            tradeDetailTableData: [{custId: '183331', custName: '***'}],
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
                {value: '0', label: '集五福'},
                {value: '1', label: '撤单'},
                {value: '2', label: '算法'},
            ],
            colorMap: ['#ec6e6e', '#f7f01b', '#1bf772']
        };
    },
    methods: {
        showStaticInfo() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.staticInfoDialog = true;
            // get static info
            let params = {
                custId: this.selectionArray.map(v => { return v.custId; })[0] // test
            };
            this.loadingStaticInfo = true;
            postCustomerAddress(params).then(resp => {
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
        },
        showTradeDetail() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.tradeDetailDialog = true;
            // let params = {
            //     custId: item.custId
            // };
            // this.loadingTradeDetail = true;
            // postCustomerTransactions(params).then(resp => {
            //     if (resp) {
            //         this.loadingTradeDetail = false;
            //         this.tradeDetailTableData = resp;
            //     } else {
            //         this.loadingTradeDetail = false;
            //         return [];
            //     }
            // }).catch(e => {
            //     this.loadingTradeDetail = false;
            // });
        },
        showTagsCloud() {
            if (!this.selectionArray.length) {
                this.$message.error('请先选择用户');
                return;
            }
            this.tagCloudDialog = true;
        },
        modifyTags(item) {
            this.modifyTagsDialog = true;
            this.currentItem = item;
        },
        handleCloseTag(item, type) {
            switch (type) {
            case 0:
                this.currentItem.eventTags.splice(this.currentItem.eventTags.indexOf(item), 1);
                break;
            case 1:
                this.currentItem.tradeTags.splice(this.currentItem.tradeTags.indexOf(item), 1);
                break;
            case 2:
                this.currentItem.modelTags.splice(this.currentItem.modelTags.indexOf(item), 1);
                break;
            case 3:
                this.currentItem.hisEventTags.splice(this.currentItem.hisEventTags.indexOf(item), 1);
                break;
            case 4:
                this.currentItem.outTags.splice(this.currentItem.outTags.indexOf(item), 1);
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
        },
        handleConfirmModifyTags() {
            this.$message.success('修改成功');
            this.modifyTagsDialog = false;
        },
        rowStyle({row}) {
            return {color: this.colorMap[row.eventTimeRange], display: this.checkedResults.indexOf(row.eventTimeRange) > -1 ? '' : 'none'};
        },
        handleCheckedResultsChange(checkedArray) {
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
