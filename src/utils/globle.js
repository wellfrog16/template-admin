import Vue from 'vue';
import {requestPrefix} from '@/utils/request';
import {exportCsv, exportCsvs} from '@/api/common';
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