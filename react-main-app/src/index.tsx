import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App";
// import { installServiceWorker } from './installServiceWorker'
// 如果不是生产环境，执行以下代码
if (process.env.APP_ENV !== 'development') {
  // 异步导入 installServiceWorker，并在导入完成后执行回调
  import('./installServiceWorker').then(({ installServiceWorker }) => {
    // 调用安装 Service Worker 的函数
    installServiceWorker();
  }).catch(error => {
    console.error('导入installServiceWorker时出错：', error);
  });
}
import './registerApps'
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<App />)
}

