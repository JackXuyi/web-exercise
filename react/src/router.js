import React from 'react'
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom'
import home from './page/home'
import hooks from './page/hooks'
import three from './page/three'

const routerConfig = [
  {
    name: '首页',
    path: '/home',
    component: home,
  },
  {
    name: 'hooks',
    path: '/hooks',
    component: hooks,
  },
  {
    name: 'three',
    path: '/three',
    component: three,
  },
]

const routerList = (config) => {
  const list = []
  config.map((item) => {
    const { children } = item
    if (!children) {
      const { path, component } = item
      list.push(<Route path={path} key={path} component={component} exact />)
    } else {
      children.map((route) => {
        const { path, component } = route
        list.push(<Route path={path} key={path} component={component} exact />)
      })
    }
  })
  return list
}

const renderRoute = () => (
  <Router>
    <Switch>
      {routerList(routerConfig)}
      <Redirect to="/home" />
    </Switch>
  </Router>
)

export default renderRoute
