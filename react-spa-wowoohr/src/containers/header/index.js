/**
 * @author xuyi 2018-09-05
 */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Dropdown, Icon } from "antd";
import { routerConfig } from "../../routes";
import "./index.less";

const { SubMenu } = Menu;

class Header extends Component {
  state = {};

  handleMenuClick = e => {
    if (e.key === "exit") {
      this.exit();
    }
  };

  // 菜单选项
  renderMenu = () => {
    const routerArr = [];
    const len = routerConfig.length;
    for (let i = 0; i < len; i++) {
      const { name, path, children } = routerConfig[i];
      if (children) {
        const clen = children.lenght;
        const crouter = [];
        for (let j = 0; j < clen; j++) {
          const { name: cname, path: cpath, component: ccomponent } = children[
            j
          ];
          crouter.push(
            <Menu.Item key={cpath}>
              <Link to={cpath}>{cname}</Link>
            </Menu.Item>
          );
        }
        routerArr.push(
          <SubMenu key={path} title={name}>
            {crouter}
          </SubMenu>
        );
      } else {
        routerArr.push(
          <Menu.Item key={path}>
            <Link to={path}>{name}</Link>
          </Menu.Item>
        );
      }
    }
    return routerArr;
  };

  render() {
    const { location: { pathname = "" } = {} } = this.props;
    return (
      <Layout.Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/homePage"]}
          style={{ lineHeight: "64px" }}
          selectedKeys={[pathname]}
        >
          {this.renderMenu()}
        </Menu>
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
