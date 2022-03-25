const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = options => {
  options = options || {}

  const publicPath = '/app'

  return {
    lintOnSave: false,
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production' ? publicPath : '/',
    chainWebpack: config => {
      config.plugin('stylelint').use(StylelintPlugin, [
        {
          files: ['**/*.{html,vue,less,css}'],
          fix: true, // 自动修复
          cache: true,
          emitError: true,
          failOnError: false
        }
      ])
      config.plugin('html').use(new HtmlWebpackPlugin({
        title: process.env.VUE_APP_NAME,
        template: 'public/index.html',
        url: 'public',
        publicPath
      }))
      config.resolve.alias
        .set('@', resolve('src'))
        .set('@com', resolve('src/components'))
        .set('@views', resolve('src/views'))
        .set('@img', resolve('src/assets/img'))
        .set('@api', resolve('src/api'))
        .set('@less', resolve('src/assets/less'))
        .set('@config', resolve('src/config'))
        .set('@mixin', resolve('src/mixins'))

      config.optimization.splitChunks(
        {
          chunks: 'all',
          cacheGroups: {
            commons: {
              name: "chunk-commons",
              test: resolve("src/components"), // 可自定义拓展你的规则
              minChunks: 2, // 最小共用次数
              priority: 5,
              reuseExistingChunk: true
            },
            libs: {
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial" // 只打包初始时依赖的第三方
            },
            elementUI: {
              name: "chunk-elementUI", // 单独将 elementUI 拆包
              priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
              test: /[\\/]node_modules[\\/]element-ui[\\/]/
            },
            echarts: {
              name: 'chunk-echarts',
              priority: 20,
              test: /[\\/]echarts[\\/]/,
            },
            SpreadJS_all: {
              name: 'chunk-SpreadJS_all',
              priority: 20,
              test: /[\\/]spread-sheets[\\/]/
            },
            SpreadJS_designer: {
              name: 'chunk-SpreadJS_designer',
              priority: 25,
              test: /[\\/]spread-sheets-designer[\\/]/
            },
            SpreadJS_charts: {
              name: 'chunk-SpreadJS_charts',
              priority: 25,
              test: /[\\/]spread-sheets-charts[\\/]/
            }
          }
        }
      )
      config.when(process.env.bundle_analyz_report, config => {
        config.plugin('webpack-bundle-analyzer').use(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888, // 运行后的端口号
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
          }))
      })
    },
    productionSourceMap: false,
    devServer: {
      host: '0.0.0.0',
      port: '8080',
      /* proxy: {
        '/api/': {
          target: 'http://test.account.qnform.com/',
          changeOrigin: true
        }
      } */
    }
  }
}
