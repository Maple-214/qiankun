const { GenerateSW } = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ENV = 'production'

module.exports = merge(commonConfig, {
  mode: ENV,
  optimization: {
    splitChunks: {
      chunks: 'all',
      // minSize: 20000, // 模块的最小大小
      minSize: 1024 * 1024, // 1mb
      maxSize: 0, // 模块的最大大小，0表示没有限制
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数
      maxInitialRequests: 30, // 入口点的最大并行请求数
      enforceSizeThreshold: 50000, // 强制执行大小限制的阈值
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // keep_classnames: isEnvProductionProfile,
          // keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true, // 安装成功后立即接管网站,注意这个要和 clientsClaim 一起设置为 true
      cleanupOutdatedCaches: true, // 尝试删除老版本缓存
      maximumFileSizeToCacheInBytes: 1024000 * 4, // 只缓存 4M 以下的文件
      include: [/.*.(png|jpg|jpeg|svg|ico|webp)$/, /.*.(js|css)$/], // 只缓存图片、js、css
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(ENV)
    })
  ]
  // 其他生产环境配置...
});
