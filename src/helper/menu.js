// 临时，以后用请求的权限实现

// todo 对菜单进行权限过滤
function filter(data) {
    return data.filter(v => {
        return v.name !== 'login';
    });
}

export default {
    filter
};
