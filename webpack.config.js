
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //用于提取公共的文件
var webpackConfig = {
    entry: './src/entry/main.js',//入口，可以是对象、数组、函数
    output: {
        path: path.resolve(__dirname, 'bin/views'),
        filename: "[name].[hash].bundle.js",
        publicPath: "/js/",
        sourceMapFilename:'[file].map'
    },
    module: {
        rules: [{
            // 处理css文件
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            // 处理html文件，并处理img 中 src 和 data-src 的引入路径
            test: /\.html$/,
            loader: "html-loader?attrs=img:src img:data-src"
        }, {
            // 处理字体文件
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=./fonts/[name].[ext]'
        }, {
            // 处理图片，并将8k以下的图片转为base64编码
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
        }]
    },
    plugins: [
        // 公共js提取
        new webpack.optimize.RuntimeChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            // minChunks: 3 // 提取至少3个模块共有的部分
        }),
        // 提取公共css样式
        new ExtractTextPlugin('./css/[name].css'),
        // 处理html文件。
        new HtmlWebpackPlugin({
            filename: './views/index.html', //生成的html存放路径，相对于path
            template: './src/entry/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            // chunks: ['vendors', allDirs[i] + '/' + matches[1]], //需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    ],
    mode: 'production'
};
module.exports = webpackConfig