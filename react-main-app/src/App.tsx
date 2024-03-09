import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import TestCssModule from '../component/TestCssModule'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/app-react">另一个react应用</Link>
      </Router>
      <h2>hello</h2>
      <TestCssModule />
      {/* 切换导航， 将微应用渲染container容器中 */}

      <div id="container"></div>
    </div>
  )
}
