/**
 * Created by Allan on 2017/09/13.
 */
import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import App from "./containers";
import Home from "./pages/home";
import NotFoundPage from "./components/NotFoundPage";

export const routerConfig = [
  {
    name: "首页",
    path: "/",
    component: Home
  }
];

const renderRouters = routers => {
  const routerArr = [];
  const len = routers.length;
  for (let i = 0; i < len; i++) {
    const { name, path, children, component } = routers[i];
    if (children) {
      const clen = children.lenght;
      for (let j = 0; j < clen; j++) {
        const { name: cname, path: cpath, component: ccomponent } = children[j];
        routerArr.push(
          <Route key={cpath} exact path={cpath} component={ccomponent} />
        );
      }
    } else {
      routerArr.push(
        <Route key={path} exact path={path} component={component} />
      );
    }
  }
  return routerArr;
};

export default () => (
  <Router>
    <App>
      <Switch>
        {renderRouters(routerConfig)}
        <Redirect to="/" />
      </Switch>
    </App>
  </Router>
);
