import Vue from 'vue';
import {requestPrefix} from '@/utils/request';
Vue.prototype.gfnGetDownloadFileUrl = (fileId, fileName) => {
    // fileName = encodeURI(fileName);
    return requestPrefix + '/admin/v1/file/downloadFile?fileId=' + fileId + '&fileName=' + fileName + '&access_token=' + localStorage.getItem('ACCESS_TOKEN');
};