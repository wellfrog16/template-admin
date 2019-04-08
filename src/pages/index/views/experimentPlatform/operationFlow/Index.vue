<template>
    <div>
        <iframe :src="apiSrc" width="100%" :height="containerHeight" style="border: none;" name="sophon" id="sophon"></iframe>
    </div>
</template>
<script>
import {getLoginSophon, getApiSrc} from '@/api/sophon';
// import {testDoubanapi} from '@/api/common';
// import config from '@/config';
export default {
    data() {
        return {
            containerHeight: 800,
            // targetUrl: 'http://172.25.61.101:8066/projects/5d74e908-bb76-4d48-a166-6c5042c77e8d/SHFEoem-new' // 生产地址
            // targetUrl: 'http://172.25.61.98:8066/projects/be1bd96c-1a8a-4d9d-aaab-e3727b313275/SHFEoem-new' // 测试地址
            // targetUrl: 'http://172.25.61.98:8066/SHFE',
            apiSrc: getApiSrc(),
        };
    },
    mounted() {
        this.containerHeight = document.getElementById('main-container').clientHeight - 18;
        // this.apiSrc = getApiSrc(localStorage.getItem('SOPHONE_TOKEN'));
        console.log(this.apiSrc);
        setTimeout(() => {
            let ifr = document.getElementById('sophon');
            console.log(ifr);
            // 使用iframe的window向iframe发送message。
            ifr.contentWindow.postMessage({Authorization: localStorage.getItem('SOPHONE_TOKEN')}, '*'); // `${config.server.api}/#/operateFlow`
            // ifr.setAttribute('src', this.apiSrc);
        }, 2000);
        // this.$jquery.ajax('http://172.25.61.96:18003/api-service/operate/test/redirectPage?token=Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFwcGFkbWluIiwicm9sZXMiOiJbXCJTT1BIT05fQURNSU5cIl0iLCJleHAiOjE1NTUyMDMwMzEsImlhdCI6MTU1NDMzOTAzMX0.g7uHIFB82JBkGpyPWryZAIB8No50ittM78tvg6iSBC0f0wVbkJlp6lbycpWn3pq0LKAtWaK3Sg5jHnagA7Xulw&url=http://172.25.61.98:8066/SHFE');
    },
    beforeRouteEnter(to, from, next) {
        // testDoubanapi().then(resp => {
        //     console.log(resp);
        // });
        let params = {
            username: localStorage.getItem('USER_NAME'),
            password: localStorage.getItem('PASSWORD')
        };
        getLoginSophon(params).then(resp => {
            if (resp) {
                localStorage.setItem('SOPHONE_TOKEN', resp);
                next();
            }
        });
    }
};
</script>
