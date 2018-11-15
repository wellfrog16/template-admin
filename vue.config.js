const mock = require('./mock');
const LessPluginFun = require('less-plugin-functions');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    assetsDir: 'src/assets',

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: null,
        before(app) { mock(app); }
    },

    pages: {
        index: {
            entry: 'src/pages/index/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        demo: {
            entry: 'src/pages/demo/main.js',
            template: 'public/index.html',
            filename: 'demo.html',
            title: 'Demo Page',
            chunks: ['chunk-vendors', 'chunk-common', 'demo']
        }
    },

    configureWebpack: {
        externals: {
            jquery: 'jQuery',
            echarts: 'echarts',
            moment: 'moment'
        },
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
