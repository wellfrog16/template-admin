const mock = require('./mock');

module.exports = {
    assetsDir: 'src/assets',

    devServer: {
        before(app) { mock(app); }
    },

    lintOnSave: true
};
