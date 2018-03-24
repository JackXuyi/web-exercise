/**
 * @author xuyi
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class home extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    console.log('props', this.props);
    return (<h1>home</h1>);
  }
}

export default connect(
  (state) => (state),
  () => ({}),
)(home);
