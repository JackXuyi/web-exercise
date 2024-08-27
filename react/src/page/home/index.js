/**
 * @author xuyi
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class home extends Component {
  constructor(props, contenxt) {
    console.log('contenxt', contenxt)
    super(props)
    this.state = {
      count: 0,
      operate: '',
      isOperate: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    return null
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', this.state, prevState)
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    return false
  }

  handleAddClick = () => {
    if (this.state.isOperate) {
      return
    }
    const { count } = this.state
    this.setState({ count: count + 1, operate: 'add', isOperate: true })
  }

  handlePlusClick = () => {
    if (this.state.isOperate) {
      return
    }
    const { count } = this.state
    this.setState({ count: count - 1, operate: 'minus', isOperate: true })
  }

  handleTranstionEnd = () => {
    this.setState({ isOperate: false })
  }

  getClassName = () => {
    const { count, operate } = this.state
    if (operate === 'add') {
      return 'slide-in'
    }
    if (operate === 'minus') {
      return 'slide-out'
    }
    return ''
  }

  render() {
    console.log('render', count)
    const { count, operate } = this.state
    return (
      <div>
        <button onClick={this.handleAddClick}>加</button>
        <button onClick={this.handlePlusClick}>减</button>
        <div className={this.getClassName()}>
          {operate === 'add' && <span>点击次数：{count - 1}</span>}
          <span>点击次数：{count}</span>
          {operate === 'minus' && <span>点击次数：{count + 1}</span>}
        </div>
        <br />
        <Link to="/hooks">hooks</Link>
      </div>
    )
  }
}

export default home
