import React from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import home from './page/home';

const routerConfig = [{
  name: '登陆',
  path: '/login',
  component: () => <h1>login</h1>,
}, {
  name: '登陆',
  path: '/logout',
  component: () => <h1>logout</h1>,
}, {
  name: '首页',
  path: '/',
  component: home,
}];

const routerList = config => {
  const list = [];
  config.map(item => {
    const { children } = item;
    if (!children) {
      const { path, component } = item;
      list.push(<Route path={path} key={path} component={component} exact />)
    } else {
      children.map(route => {
        const { path, component } = route;
        list.push(<Route path={path} key={path} component={component} exact />);
      });
    }
  });
  return list;
}

const renderRoute = () => (
  <Router>
    <Switch>
      {routerList(routerConfig)}
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default renderRoute;
