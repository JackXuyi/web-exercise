/**
 * @author xuyi
 * @flow
 */

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Input, Button, Table } from "antd";
import ReactJson from "react-json-view";
import { fetchRelatedList, fetchList } from "../../redux/modules/testRedux";
import "./index.less";

const { Search } = Input;

// 判断是否为对象
const isObject = (param: mixed) => {
  return typeof param === "object";
};

// 递归把层层嵌套的对象转化为对象数组，{ key: 父级key加当前key的组合（数组用index代替）, name, value，type：当前元素类型，children：对应的子元素 }
const objectTransformArray = (obj: Object, prefix: string = "") => {
  const retArr = [];
  if (isObject(obj) && Array.isArray(obj)) {
    // 数组
    const len = obj.length;
    for (let i = 0; i < len; i++) {
      const key = prefix ? `${prefix}.${i}` : `${i}`;
      if (isObject(obj[i])) {
        const item = {
          key,
          name: i,
          value: null,
          type: Array.isArray(obj[i]) ? "array" : typeof obj[i],
          children: objectTransformArray(obj[i], key)
        };
        retArr.push(item);
      } else {
        const item = {
          key,
          name: i,
          value: obj[i],
          type: typeof obj[i]
        };
        retArr.push(item);
      }
    }
  } else if (isObject(obj)) {
    // 对象
    const keys = Object.keys(obj);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const key = prefix ? `${prefix}.${keys[i]}` : keys[i];
      if (isObject(obj[keys[i]])) {
        const item = {
          key,
          name: keys[i],
          value: null,
          type: Array.isArray(obj[keys[i]]) ? "array" : typeof obj[keys[i]],
          children: objectTransformArray(obj[keys[i]], key)
        };
        retArr.push(item);
      } else {
        const item = {
          key,
          name: keys[i],
          value: obj[keys[i]],
          type: typeof obj[keys[i]]
        };
        retArr.push(item);
      }
    }
  } else {
    // 其它简单类型，包括number、boolean、string、null等
    //
  }
  return retArr;
};

type Props = {
  data: Object,
  relatedData: Object,
  fetchRelatedList: typeof fetchRelatedList,
  fetchList: typeof fetchList
};
type State = {
  value: string,
  obj: Object
};

class Home extends Component<Props, State> {
  isUnmounted: boolean;
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      obj: {}
    };
    this.isUnmounted = true;
  }

  componentDidMount() {
    // this.props.fetchRelatedList().then(() => {
    //   const { data, relatedData } = this.props;
    //   !this.isUnmounted && this.setState({ obj: { data, relatedData } });
    //   // console.log("data", this.props.data);
    // });
  }

  componentWillUnmount() {
    this.isUnmounted = false;
  }

  // 请求数据
  getData = (str: string) => {
    this.props.fetchList({ name: str }).then(data => {
      this.isUnmounted && this.setState({ obj: { ...data } });
    });
  };

  //
  onAdd = (add: { updated_src: Object }) => {
    const { updated_src } = add;
    this.setState({ obj: updated_src });
    console.log("add", updated_src);
  };

  //
  onDelete = (del: { updated_src: Object }) => {
    const { updated_src } = del;
    this.setState({ obj: updated_src });
    console.log("del", updated_src, del);
  };

  //
  onEdit = (edit: { updated_src: Object }) => {
    const { updated_src } = edit;
    this.setState({ obj: updated_src });
    console.log("edit", updated_src);
  };

  render() {
    const { value, obj } = this.state;
    return (
      <div className="home">
        <Search
          placeholder="input search text"
          enterButton="搜索"
          size="large"
          style={{ width: 500, marginBottom: 10 }}
          onSearch={value => this.getData(value)}
        />
        <div className="home-json">
          <ReactJson
            src={obj}
            style={{ width: "100%", margin: "10px auto", textAlign: "left" }}
            onEdit={this.onEdit}
            onAdd={this.onAdd}
            onDelete={this.onDelete}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (store, props) => {
    const { data, relatedData } = store.test;
    return {
      relatedData,
      data,
      ...props
    };
  },
  (dispatch: Function) =>
    bindActionCreators(
      {
        fetchRelatedList,
        fetchList
      },
      dispatch
    )
)(Home);
