var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'template');

module.exports = {

  //入口
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    vendors: ['jquery', 'moment']
  },

  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },

  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: 'jshint-loader'
      }
    ],

    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap'],
        include: APP_PATH
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
    ]
  },

  //配置jshint的选项，支持es6的校验
  jshint: {
    "esnext": true
  },

  //添加我们的插件 会自动生成一个html文件
  plugins: [
    //创建了两个HtmlWebpackPlugin的实例，生成两个页面
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app', 'vendors'],
      //要把script插入到标签里
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'moblie.html'),
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: 'body'
    }),

    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),

    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

  ],


};