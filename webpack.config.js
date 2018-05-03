
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
var webpackConfig = {
    entry: './src/entry/main.js',//入口，可以是对象、数组、函数
    output: {
        path: __dirname+"/bin/views",
        filename: "./js/[name].js",
    },
    module: {
        rules: [{
            test: /\.js$/, // babel 转换为兼容性的 js
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'latest']
            }
        }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/modules/index.html",
            inject:"body"
        })
    ]
};
module.exports = webpackConfig;