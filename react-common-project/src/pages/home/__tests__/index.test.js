/**
 * @author xuyi
 */
import React from "react";
import enzyme from "enzyme";
import store from "../../../redux/store";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "antd";
import Chome, { home as Home } from "../index";

enzyme.configure({ adapter: new Adapter() });

const { shallow, render, mount } = enzyme;

describe("home首页测试", () => {
  const props = {
    reateExampleAction: () => null,
    fetchList: () => null,
    counter: 1
  };
  const home = shallow(<Home {...props} />);
  test("页面元素测试", () => {
    expect(home.find("h1").exists()).toEqual(true);
    expect(home.find("h3").exists()).toEqual(true);
    expect(home.find("div").exists()).toEqual(true);
    expect(home.find("Button").exists()).toEqual(true);
  });

  test("页面组件props和state测试", () => {
    expect(home.state()).toEqual({ counter: 1 });
    home.setProps({ counter: 2 });
    expect(home.state()).toEqual({ counter: 2 });
  });

  const cHome = mount(
    <Provider store={store}>
      <Chome />
    </Provider>
  );
  test("测试页面组件与store链接后的效果", () => {
    const chome = cHome.find(Chome);
    const btn = chome.find(Button);
    btn.simulate("click");
    expect(cHome.find("h3").text()).toEqual("1");
  });
});
