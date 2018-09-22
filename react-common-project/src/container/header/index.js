/**
 * @author xuyi
 * @flow
 */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu } from "antd";
import { routerConfig } from "../../router";
import "./index.less";

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

type Props = {
  location: {
    pathname: string
  }
};
type State = {
  current: string
};

class header extends Component<Props, State> {
  state = {
    current: ""
  };
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { pathname } = nextProps.location;
    return {
      ...prevState,
      current: pathname
    };
  }

  // render menu
  renderMenu = () => {
    const menus = routerConfig.map(item => {
      const { path, children, name } = item;
      if (children) {
        let key = name;
        const submenus = children.map(sub => {
          const { path: cPath, name: cName } = sub;
          key += cPath;
          return (
            <MenuItem key={cPath}>
              <Link to={cPath}>{cName}</Link>
            </MenuItem>
          );
        });
        return (
          <SubMenu key={key} title={name}>
            {submenus}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem key={path}>
            <Link to={path}>{name}</Link>
          </MenuItem>
        );
      }
    });
    return menus;
  };

  render() {
    const { current } = this.state;
    return (
      <div className="header">
        <Menu className="menu" mode="horizontal" selectedKeys={[current]}>
          {this.renderMenu()}
        </Menu>
      </div>
    );
  }
}

export default withRouter(header);
