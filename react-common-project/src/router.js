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
import home from "./pages/home";
import slideCheck from "./pages/slideCheck";

export const routerConfig = [
  {
    name: "首页",
    path: "/home",
    component: home
  },
  {
    name: "工具",
    children: [
      {
        name: "滑块验证",
        path: "/slideCheck",
        component: slideCheck
      },
      {
        name: "测试222",
        path: "/test222",
        component: () => <h2>测试222</h2>
      }
    ]
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
      for (let j = 0; j < cLen; j++) {
        const { path: cPath, component: cComponent } = children[j];
        routers.push(
          <Route exact key={cPath} path={cPath} component={cComponent} />
        );
      }
    } else {
      routers.push(
        <Route exact key={path} path={path} component={component} />
      );
    }
  }
  return routers;
};

export default props => {
  const { children } = props;
  return (
    <App>
      <Switch>
        {renderRouters(routerConfig)}
        <Redirect to="/home" />
      </Switch>
      {children}
    </App>
  );
};
