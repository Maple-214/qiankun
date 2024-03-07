import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:4444',
    container: '#container',
    activeRule: '/app-react',
  },
]);
// 启动 qiankun
start();