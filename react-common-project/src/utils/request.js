/**
 * @author xuyi
 */

const outTime = 15 * 1000;

/**
 * 把请求的参数对象转化为URL参数，格式参考jQuery的param函数
 * @param {*} param 请求的参数
 * @param {*} prefix 请求参数key值前缀
 */
const getRequestParam = (param, prefix = "") => {
  let strArr = [];
  if (typeof param === "object") {
    // 对象
    const keys = Object.keys(param);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      if (typeof param[keys[i]] === "object") {
        strArr.push(
          getRequestParam(
            param[keys[i]],
            prefix ? `${prefix}[${keys[i]}]` : `${keys[i]}`
          )
        );
      } else {
        strArr.push(
          `${encodeURIComponent(
            prefix ? `${prefix}[${keys[i]}]` : `${keys[i]}`
          )}=${encodeURIComponent(param[keys[i]].trim().replace(/\s+/g, "+"))}`
        );
      }
    }
  }
  return strArr.join("&");
};

/**
 * 获取异步请求的headers，默认跨域及请求json数据
 * @param {*} header 传入的自定义header
 */
const getRequestHeaders = (header = {}) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: "*",
    "Access-Control-Allow-Origin": "*"
  });
  const keys = Object.keys(header);
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    headers.set(keys[i], header[keys[i]]);
  }
  return headers;
};

/**
 * 获取完整的URL及参数
 * @param {*} url 基础的URL
 * @param {*} param URL中的查询参数
 */
const getRequestUrl = (url, param = {}) => {
  const index = url.indexOf("?");
  const len = url.length;
  let newUrl = "";
  const paramStr = getRequestParam(param);
  if (index > -1 && index < len - 1) {
    // 存在?且不在最后，只需要用&把字符串参数拼接起来
    newUrl = `${url}&${paramStr}`;
  } else if (index > -1 && index === len - 1) {
    // 存在?且在最后，只需要把字符串参数拼接起来
    newUrl = `${url}${paramStr}`;
  } else {
    newUrl = `${url}?${paramStr}`;
  }
  return newUrl;
};

/**
 * 创建异步请求的action type
 * @param {*} actionType 异步请求的action type
 */
const createAsyncActionType = actionType => {
  return {
    type: actionType,
    pending: `${actionType}_pending`,
    accept: `${actionType}_accept`,
    reject: `${actionType}_reject`
  };
};

/**
 * 异步请求返回数据处理函数
 * @param {*} respose 请求返回的数据
 */
const handleResponse = response => {
  if (response.status >= 200 && response.status < 300) {
    try {
      const res = response.json();
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject({
        statusCode: response.status,
        msg: "返回的数据不为JSON格式"
      });
    }
  }
};

/**
 * 创建异步请求action的公共函数
 * @param {*} actionType 异步请求的action type，需通过createAsyncActionType函数创建
 * @param {*} url 异步请求的url
 * @param {*} method 异步请求的方法，分别为"GET","POST","PUT","DELETE","HEADER","OPTION"，默认值为"GET"
 * @param {*} repeat 是否可以重复请求，true为可以重复请求，false为不能重复请求
 * @param {*} headers 请求时发送的头部信息，默认值为{}
 */
const createAsyncAction = (
  actionType,
  url = "",
  method = "GET",
  repeat = true,
  header = {}
) => (params = null, rj = err => null, rUrl = "") => dispatch => {
  let realUrl = rUrl ? rUrl : url;
  const { type, pending, accept, reject } = actionType;
  const headers = getRequestHeaders(header);
  let requestParams = {
    method,
    mode: "cors",
    cache: "default",
    headers
  };

  switch (`${method}`.toUpperCase()) {
    case "GET": {
      realUrl = params
        ? getRequestUrl(realUrl, params)
        : getRequestUrl(realUrl);
      break;
    }
    case "POST":
    case "PUT":
    case "DELETE":
    case "HEADERS":
    case "OPTION":
    default: {
      realUrl = getRequestUrl(realUrl);
      requestParams = { ...requestParams, body: JSON.stringify(params) };
    }
  }
  const request = fetch(realUrl, requestParams);
  const outTimePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        statusCode: 1,
        msg: "接口请求超时"
      });
    }, outTime);
  });
  dispatch({ type: pending });
  return Promise.race([outTimePromise, request])
    .then(handleResponse)
    .then(data => {
      dispatch({ type: accept, payload: data });
      return Promise.resolve(data);
    })
    .catch(err => {
      dispatch({ type: reject });
      console.error(err);
      rj && rj(err);
    });
};

export { createAsyncActionType, createAsyncAction };
