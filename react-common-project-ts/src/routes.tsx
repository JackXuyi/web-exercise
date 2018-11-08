/**
 * @author xuyi
 */
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import home from "./pages/home";

type RouteType = {
  name: string;
  route: string;
  icon?: string;
  component: any;
  children?: Array<RouteType>;
};

export const routerConfig: Array<RouteType> = [
  {
    name: "首页",
    route: "/home",
    icon: "",
    component: home
  }
];

const renderRouters: any = (routes: Array<RouteType>) => {
  const routeArr = [];
  const len = routes.length;
  for (let i = 0; i < len; i++) {
    const { name, route, component, children } = routes[i];
    if (children) {
      routeArr.push(...renderRouters(children));
    } else {
      routeArr.push(<Route path={route} key={route} component={component} />);
    }
  }
  return routeArr;
};

const app = () => (
  <Router>
    <Switch>
      {renderRouters(routerConfig)}
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default app;
