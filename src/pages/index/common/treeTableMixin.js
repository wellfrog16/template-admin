import _ from 'lodash';
import {exportResultSet} from '@/api/common';
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
        handleExportResult(propsResultType) {
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
                let sceneCommitParams = this.$store.getters.sceneCommitParams;
                if (params.resultType === '1') {
                    params.statStartDt = sceneCommitParams.statStartDt;
                    params.statStopDay = sceneCommitParams.statStopDay;
                    params.statFreq = sceneCommitParams.statFreq;
                    params.resultList = this.dealMainData();
                }
                if (params.resultType === '5') {
                    params.resultListSyn = this.dealMainData();
                }
                this.fullLoading = true;
                exportResultSet(params).then(resp => {
                    console.log(resp);
                    this.fullLoading = false;
                    if (this.$route.name === 'assoAccountGroupMerge') {
                        this.updateResultList();
                    }
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
                fileName: fileName || '测试',
                tableColumns: mainTableColumns,
                tableData: tableData
            };
            this.gfnExportFileWithForm(params);
        },
        createNewData() {},
    }
};
