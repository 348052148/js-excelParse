const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
function resolve (dir) {
    return path.join(__dirname, '', dir)
}

module.exports = {
    mode: 'development', //开发和上线模式启用一些优化 webpack --mode=production
    entry: './src/index.js',
    /*
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    },//多入口配置
    */
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index-webpack.bundle.js'
    },
    /* 多个入口。出口配置
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }*/

    module: {
        rules: [

            {
                test: /\.js$/,
                use:[
                    'babel-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif|ico|ttf|woff)(\?\S*)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.less$/,
                exclude: '/node_modules',
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',  //
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            }
            //webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader' CLI方式
            //import Styles from 'style-loader!css-loader?modules!./styles.css'; 内联方式
            //{ test: /\.txt$/, use: 'raw-loader' },
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        //snew webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};