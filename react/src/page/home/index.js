/**
 * @author xuyi
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class home extends Component {
  constructor(props, contenxt) {
    console.log('contenxt', contenxt)
    super(props);
    this.state = {
      count: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount')
  }


  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', this.state, prevState)
    return null;
  }

  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate', this.state, prevState)
    return false;
  }

  render() {
    console.log('render', count);
    const { count } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ count: count + 1 })} >加</button>
        <span>点击次数：{count}</span>
      </div>
    );
  }
}

export default home;
