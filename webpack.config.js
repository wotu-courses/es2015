var webpack = require('webpack');
var path = require('path');
// 生成html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    // 开启source-map方法1
    devtool: 'cheap-module-eval-source-map',
    output: {
        // 带5位hash,用来做缓存
        filename: '[name]-[hash:5].js',
        // filename: '[name].js',
        // 必须是绝对路径
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        // 生成html
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html',
            template: 'index.html'
        })
        // 开启source-map方法2
        // new webpack.SourceMapDevToolPlugin({
        //     filename: '[name].js.map',
        //     exclude: ['commons.js']
        // }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        inline: true //实时刷新
            // 配置跨域
    }
}