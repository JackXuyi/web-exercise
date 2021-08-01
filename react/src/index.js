/**
 * @author xuyi
 */
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import App from './router'
// import store from './redux'

function Test() {
  const [a, setA] = useState(0)
  return <div>{a}</div>
}

ReactDOM.render(
  <Test />,
  document.getElementById('root') || document.getElementsByTagName('body')[0]
)
