/**
 * @author xuyi
 */
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import App from './router'
// import store from './redux'

ReactDOM.render(
  <App />,
  document.getElementById('root') || document.getElementsByTagName('body')[0]
)
