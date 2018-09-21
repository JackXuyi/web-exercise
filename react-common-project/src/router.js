/**
 * @author xuyi
 */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import App from "./container";
import home from "pages/home";

export const routerConfig = [
  {
    name: "首页",
    path: "/home",
    component: home
  },
  {
    name: "测试",
    path: "/test",
    component: () => <h2>测试</h2>
  }
];

// 渲染路由
const renderRouters = config => {
  const len = config.length;
  const routers = [];
  for (let i = 0; i < len; i++) {
    const { path, component, children } = config[i];
    if (children) {
      const cLen = children.length;
      const { path: cPath, component: cComponent } = config[i];
      for (let j = 0; j < cLen; j++) {
        routers.push(<Route key={cPath} path={cPath} component={cComponent} />);
      }
    } else {
      routers.push(<Route key={path} path={path} component={component} />);
    }
  }
  return routers;
};

export default props => {
  const { children } = props;
  return (
    <Router>
      <App>
        <Switch>
          {renderRouters(routerConfig)}
          <Redirect to="/home" />
        </Switch>
        {children}
      </App>
    </Router>
  );
};
