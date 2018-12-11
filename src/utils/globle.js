import Vue from 'vue';
import {requestPrefix} from '@/utils/request';
import {exportCsv} from '@/api/common';
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
Vue.prototype.gfnExportFileWithForm = (params, url) => {
    url = exportCsv(url);
    exportWithForm(url, params);
};