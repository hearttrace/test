// npm install webpack webpack-cli -D
// npm install html-webpack-plugin -D

// npm install style-loader css-loader -D
// npm install less-loader less -D
// npm install sass-loader node-sass -D

// npm install postcss-loader autoprefixer -D

// npm install url-loader file-loader -D

// npm install vue-loader vue-template-compiler -D

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
  template: './dist/index.html', // //设置生成预览页面的模板文件
  filename: 'index.html' // 设置生成的预览页面名称
})

// 安装post-css自动添加css的兼容性前缀（-ie-,-webkit-）
const autoprefixer = require('autoprefixer')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vuePlugin = new VueLoaderPlugin()


module.exports = {
  mode: 'development', // production
  entry: path.join(__dirname, './src/main.js'), // 默认 src/index.js
  output: { path: path.join(__dirname, './dist'), filename: 'bundle.js' }, // 默认 dist/main.js

  plugins: [
    htmlPlugin,
    autoprefixer,
    vuePlugin
  ],

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16940' }, // limit用来设置字节数，只有小于limit值的图片，才会转换
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: '/node_modules/' },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}
