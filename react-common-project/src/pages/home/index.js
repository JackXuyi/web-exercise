/**
 * @author xuyi
 * @flow
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { createExampleAction, fetchList } from "modules/examples";
import "./index.less";

type Props = {
  createExampleAction: typeof createExampleAction,
  fetchList: typeof fetchList,
  counter: number
};
type State = {
  counter: number
};
export class home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    this.props.fetchList();
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { counter } = nextProps;
    return {
      ...prevState,
      counter
    };
  }

  handleBtnClick = () => {
    this.props.createExampleAction();
  };

  render() {
    const { counter } = this.state;
    return (
      <div className="home">
        <h1>hello world</h1>
        <h3>{counter}</h3>
        <Button type="primary" onClick={this.handleBtnClick}>
          加一
        </Button>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { counter } = state.example;
    return {
      counter,
      ...props
    };
  },
  dispatch =>
    bindActionCreators(
      {
        createExampleAction,
        fetchList
      },
      dispatch
    )
)(home);
