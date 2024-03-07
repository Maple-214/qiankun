import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import App from './App';

function render(props: any) {
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  createRoot(root).render(<App />)
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react18] react app bootstraped');
}

export async function mount(props: any) {
  console.log('[react18] props from main framework', props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  createRoot(root).unmount();
}