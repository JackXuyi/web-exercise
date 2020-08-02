/**
 * 排列问题可以简化为每次从数组中提取出一个元素
 * 边界处理
 *  1. 当只需要一个元素时返回这个元素的二维数组
 *  2. 其它每次提取一个元素放到数组中即可
 */

function getData(arr, restLen) {
  if (arr.length < restLen) {
    return []
  }
  let result = []
  for (let i = 0; i < arr.length; i++) {
    const tempArr = arr.filter((ele, index) => i !== index)
    let list = []
    if (restLen <= 1) {
      list = [[arr[i]]]
    } else {
      list = getData(tempArr, restLen - 1).map((item) => [arr[i], ...item])
    }

    result = [...result, ...list]
  }
  return result
}

const arr = [1, 2, 3, 4]
let list = []
for (let i = 1; i <= arr.length; i++) {
  list = [...list, ...getData(arr, i)]
}

console.log('list', list, list.length)
