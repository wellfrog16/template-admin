import _ from 'lodash';
import {exportResultSet, getRegeneratingData} from '@/api/common';
export default {
    data() {
        return {
            accountIdPre: 'XG', // 相关性分析类型的账户组号前缀
            childrenMap: {},
            selectAccountGroupList: [],
            mainTableData: []
        };
    },
    methods: {
        updateMainTableData(val) {
            this.mainTableData = val;
            this.sortByAccountId();
        },
        updateCheckedList(checkedNodes, checkedKeys) {
            this.selectAccountGroupList = checkedKeys;
            this.$emit('updateSelectAccountGroupList', checkedKeys);
        },
        deleteMethods(deleteList) {
            let list = JSON.parse(JSON.stringify(this.mainTableData));
            deleteList.forEach(v => {
                if (v.children) {
                    list = list.filter(l => {
                        return l.acctId !== v.acctId;
                    });
                } else {
                    list.forEach(l => {
                        if (l.children && l.acctId === v.acctId) {
                            l.children.splice(l.children.findIndex(f => { return f.custId === v.custId; }), 1);
                        }
                    });
                }
            });
            this.mainTableData = JSON.parse(JSON.stringify(list));
        },
        // 删除
        handleDelete() {
            let checkedNodes = this.getCheckedNodes();
            this.deleteMethods(checkedNodes);
        },
        getMaxAccountId() {
            let acctIds = [...new Set(this.mainTableData.map(v => {
                return +v.acctId.slice(2);
            }))];
            return _.max(acctIds);
        },
        createAccountId(propsNew) {
            let newId = propsNew || this.getMaxAccountId() + 1;
            return this.accountIdPre + (('00000' + newId).slice(-6));
        },
        createTreeId() {
            return new Date().getTime();
        },
        getCheckedNodes(flag) {
            return this.$refs['self-tree-table'].$refs['tree-table'].getCheckedNodes(flag);
        },
        // 拆分
        handleSplit() {
            let checkedNodes = this.getCheckedNodes();
            let acctIds = checkedNodes.map(v => {
                return v.acctId;
            });
            acctIds = [...new Set(acctIds)];
            if (!acctIds.length) {
                this.$message.error('请选择子账户号');
                return;
            }
            if (acctIds.length > 1) {
                this.$message.error('请选择一个账户组内的子账户号');
                return;
            }
            // 设置前缀；XG/DZ/GX
            this.accountIdPre = acctIds[0].slice(0, 2);
            let checkedChildren = this.getCheckedNodes(true);
            this.deleteMethods(checkedNodes);
            let resultSetName = this.createTreeId();
            checkedChildren.forEach(v => {
                v.acctId = this.createAccountId();
                v.resultSetName = resultSetName;
            });
            this.mainTableData.push({
                id: this.createTreeId(),
                acctId: this.createAccountId(),
                resultSetName: resultSetName,
                children: checkedChildren
            });
            this.sortByAccountId();
        },
        sortByAccountId() {
            this.mainTableData = _.sortBy(this.mainTableData, [item => {
                return item.acctId;
            }]);
        },
        // 合并
        handleMerge() {
            let checkedNodes = this.getCheckedNodes();
            let checkedChildren = this.getCheckedNodes(true);
            let acctGroups = [];
            let acctIds = [];
            let resultSetName = '';
            checkedNodes.forEach(v => {
                resultSetName = v.resultSetName || '';
                if (v.acctId && !v.custId) {
                    acctGroups.push(v);
                    acctIds.push(v.acctId);
                }
            });
            // 设置前缀；XG/DZ/GX
            this.accountIdPre = checkedNodes[0]['acctId'].slice(0, 2);
            if (!(acctGroups.length && acctGroups.length > 1)) {
                this.$message.error('请选择多个账户组');
                return;
            }
            let acctIdsNO = acctIds.map(v => {
                return v.slice(2);
            });
            let minNo = _.min(acctIdsNO);
            this.deleteMethods(checkedNodes);
            checkedChildren.forEach(v => {
                v.acctId = this.createAccountId(minNo);
            });
            this.mainTableData.push({
                resultSetName: resultSetName,
                id: this.createTreeId(),
                acctId: this.createAccountId(minNo),
                children: _.unionBy(checkedChildren, 'custId')
            });
            this.sortByAccountId();
        },
        dealMainData() { //  将树形结构处理为list
            let tableData = [];
            this.mainTableData.forEach(v => {
                if (v.children) {
                    tableData = tableData.concat(v.children);
                }
            });
            return tableData;
        },
        // 导出到结果集
        handleExportResult(propsResultType, resultId) {
            this.$prompt('请输入结果集名称', '导出到结果集', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,30}$/,
                inputErrorMessage: '结果集名称只能输入汉字、字母或者数字，长度30个字符以内'
            }).then(({value}) => {
                let params = {
                    resultType: propsResultType || '5', // 结果集类型（1：相关性；5：合并）
                    resultName: value
                };
                if (params.resultType !== '5') {
                    let sceneCommitParams = this.$store.getters.sceneCommitParams[resultId];
                    params.statStartDt = sceneCommitParams.statStartDt;
                    params.statStopDay = sceneCommitParams.statStopDay;
                    params.statFreq = sceneCommitParams.statFreq;
                }
                if (params.resultType === '1') {
                    params.resultList = this.dealMainData();
                }
                if (params.resultType === '2') {
                    params.cluserInfoVOS = this.dealMainData();
                }
                if (params.resultType === '3') {
                    params.resultListInfo = this.dealMainData();
                }
                if (params.resultType === '4') {
                    params.resultListPerson = this.dealMainData();
                }
                if (params.resultType === '5') {
                    params.resultListSyn = this.dealMainData();
                }
                this.$emit('updateFullLoading', true);
                if (params.resultType === '5') {
                    this.updateFullLoading(true);
                }
                exportResultSet(params).then(resp => {
                    this.$emit('updateFullLoading', false);
                    if (params.resultType === '5') {
                        this.updateFullLoading(false);
                    }
                    if (this.$route.name === 'assoAccountGroupMerge') {
                        this.$emit('updateResultList');
                    } else if (this.$route.name === 'multipleScenesMerge') {
                        this.updateResultList();
                    }
                }).catch(e => {
                    console.error(e);
                    this.$emit('updateFullLoading', false);
                });
            }).catch(() => {});
        },

        // 导出到csv
        handleExportCsv(fileName, mainTableColumns) {
            let tableData = this.dealMainData();
            if (tableData && !tableData.length) {
                this.$message.error('暂无数据');
                return;
            }
            let params = {
                fileName: fileName || '',
                tableColumns: mainTableColumns,
                tableData: tableData
            };
            this.gfnExportFileWithForm(params);
        },
        // 重新生成数据
        createNewData(propsResultType, resultId) {
            let params = {
                id: resultId,
                stateId: 1, // 重新生成数据标识
                taskId: this.taskId,
                resultType: propsResultType || '5', // 结果集类型（1：相关性；5：合并）
            };
            if (params.resultType !== '5') {
                let sceneCommitParams = this.$store.getters.sceneCommitParams[resultId];
                params.statStartDt = sceneCommitParams.statStartDt;
                params.statStopDay = sceneCommitParams.statStopDay;
                params.statFreq = sceneCommitParams.statFreq;
            }
            if (params.resultType === '1') {
                params.resultList = this.dealMainData();
            }
            if (params.resultType === '2') {
                params.cluserInfoVOS = this.dealMainData();
            }
            if (params.resultType === '3') {
                params.resultListInfo = this.dealMainData();
            }
            if (params.resultType === '4') {
                params.resultListPerson = this.dealMainData();
            }
            if (params.resultType === '5') {
                params.resultListSyn = this.dealMainData();
            }
            this.$emit('updateFullLoading', true);
            getRegeneratingData(params).then(resp => {
                this.$emit('updateFullLoading', false);
                let store = this.$store.getters.sceneCommitResp;
                store[params.id] = resp;
                this.$store.commit('saveSceneCommitResp', store);
                let flag = String(propsResultType) === '1' ? 1 : null;
                this.drewChart1(flag);
            }).catch(e => {
                console.error(e);
                this.$emit('updateFullLoading', false);
            });
        },
    }
};
