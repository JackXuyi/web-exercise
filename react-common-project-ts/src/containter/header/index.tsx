/**
 * @author xuyi
 */
import * as React from "react";
import { Menu } from "antd";
import { routerConfig } from "../../routes";

const { Component } = React;
const { SubMenu } = Menu;

type Props = {};
type State = {
  current: "/home";
};

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      current: "/home"
    };
  }

  //   render routers
  renderRouters = (config: Array<any>) => {
    const routers = [];
    const len = config.length;
    for (let i = 0; i < len; i++) {
      const { name, route, icon, children } = config[i];
      if (children) {
        routers.push(
          <SubMenu
            key={name}
            title={
              <span>
                {icon ? <i className={icon} /> : null}
                {name}
              </span>
            }
          >
            {this.renderRouters(children)}
          </SubMenu>
        );
      } else {
        routers.push(
          <Menu.Item key={route}>
            {icon ? <i className={icon} /> : null}
            {name}
          </Menu.Item>
        );
      }
    }
    return routers;
  };

  render() {
    const { current } = this.state;
    return (
      <Menu selectedKeys={[current]} mode="horizontal">
        {this.renderRouters(routerConfig)}
      </Menu>
    );
  }
}

export default Header;
