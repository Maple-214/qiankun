const { GenerateSW } = require('workbox-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true, // 安装成功后立即接管网站,注意这个要和 clientsClaim 一起设置为 true
      cleanupOutdatedCaches: true, // 尝试删除老版本缓存
      maximumFileSizeToCacheInBytes: 1024000 * 4, // 只缓存 4M 以下的文件
      include: [/.*.(png|jpg|jpeg|svg|ico|webp)$/, /.*.(js|css)$/], // 只缓存图片、js、css
    })
  ]
  // 其他生产环境配置...
});
