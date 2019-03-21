import Vue from 'vue';
import {requestPrefix} from '@/utils/request';
import {exportCsv, exportCsvs, getUserInterfaceState} from '@/api/common';
const exportWithForm = (url, params) => {
    let form = document.createElement('form');
    form.style.display = 'none';
    form.action = url;
    form.method = 'POST';
    document.body.appendChild(form);

    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'params';
    input.value = JSON.stringify(params);
    form.appendChild(input);

    form.submit();
};
Vue.prototype.gfnGetDownloadFileUrl = (fileId, fileName) => {
    // fileName = encodeURI(fileName);
    return requestPrefix + '/admin/v1/file/downloadFile?fileId=' + fileId + '&fileName=' + fileName + '&access_token=' + localStorage.getItem('ACCESS_TOKEN');
};
Vue.prototype.gfnExportFileWithForm = (params, url, type) => {
    if (type) {
        url = exportCsvs(url);
    } else {
        url = exportCsv(url);
    }
    exportWithForm(url, params);
};
Vue.prototype.gfnSortByNumber = (field, next, curr) => {
    let {a, b} = sortCommonMethod(field, next, curr);
    return sortByNumber(a, b);
};
Vue.prototype.gfnSortByChineseCharacters = (field, next, curr) => {
    let {a, b} = sortCommonMethod(field, next, curr);
    return sortByChineseCharacters(a, b);
};
Vue.prototype.gfnSortColByDetailTime = (field, next, curr) => {
    let {a, b} = sortCommonMethod(field, next, curr);
    return sortByDetailTime(a, b);
};
function sortCommonMethod(field, next, curr) {
    if (field == null) {
        console.error('[Element-UI Table排序]filed不能为空!');
    }
    let a = next == null ? null : next[field];
    let b = curr == null ? null : curr[field];
    return {a, b};
}
function sortByDetailTime(a, b) {
    if (a === '' || a == null) { // 针对空格和0的排序
        return -1;
    }
    if (b === '' || b == null) {
        return 1;
    }
    a = Number(a.replace(/:/g, '')); // 去除包含的冒号
    b = Number(b.replace(/:/g, ''));
    return a - b;
}

function sortByNumber(a, b) {
    if (a === '' || a == null) { // 针对空格和0的排序
        return -1;
    }
    if (b === '' || b == null) {
        return 1;
    }

    if (typeof a !== 'number') {
        a = Number(a.replace(/,/g, '')); // 去除包含的逗号
    }

    if (typeof b !== 'number') {
        b = Number(b.replace(/,/g, ''));
    }

    return a - b;
}

//  按照拼音首字母排序，主要用于table中名称列的排序
function sortByChineseCharacters(a, b) {
    if (a) {
        return a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'});
    }
}
Vue.prototype.getUserInterfaceState = (reqUrl, callback) => {
    const loading = Vue.prototype.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    getUserInterfaceState({reqUrl}).then(resp => {
        loading.close();
        if (String(resp) === '2') {
            callback && callback();
        } else {
            // let text = String(resp) === '0' ? '有相同' : '有不同';
            Vue.prototype.$confirm('本任务预计运行时间较长，监测到现在有其它耗时任务正在后台执行，是否确定继续执行本任务?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    callback && callback();
                });
        }
    }).catch(e => {
        loading.close();
        console.error(e);
    });
};