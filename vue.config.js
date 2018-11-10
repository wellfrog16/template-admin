const mock = require('./mock');
const LessPluginFun = require('less-plugin-functions');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    assetsDir: 'src/assets',

    devServer: {
        before(app) { mock(app); }
    },

    configureWebpack: {
        plugins: [
            new StyleLintPlugin({
                context: 'src',
                files: ['**/*.less', '**/*.s?(a|c)ss', '**/*.vue']
            })
        ]
    },

    lintOnSave: true,

    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                plugins: [ new LessPluginFun() ]
            },
        },
        //     // 启用 CSS modules for all css / pre-processor files.
        //     modules: false
    }
};
