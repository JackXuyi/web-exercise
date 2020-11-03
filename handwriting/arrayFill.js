const colLen = 3
const rowLen = 3

let arr = new Array(rowLen).fill(new Array(colLen).fill(0))
arr[0][0] = 1

console.log('原始数组 fill 测试')
for (let i = 1; i < rowLen; i++) {
  console.log(arr[i][0], arr[i - 1][0], arr[i][0] === arr[i - 1][0])
}

console.log('自定义实现数组 fill 测试')
Array.prototype.myFill = function (value, start, end) {
  const len = this.length
  const realEnd = end > len ? len : end || len
  for (let i = start || 0; i < realEnd; i++) {
    this[i] = value
  }
  return this
}

arr = new Array(rowLen).myFill(new Array(colLen).myFill(0))
arr[0][0] = 1

for (let i = 1; i < rowLen; i++) {
  console.log(arr[i][0], arr[i - 1][0], arr[i][0] === arr[i - 1][0])
}

console.log('自定义实现数组深层 fill 测试')
Array.prototype.myDeepFill = function (value, start, end) {
  const len = this.length
  const realEnd = end > len ? len : end || len
  for (let i = start || 0; i < realEnd; i++) {
    this[i] = JSON.parse(JSON.stringify(value))
  }
  return this
}

arr = new Array(rowLen).myDeepFill(new Array(colLen).myDeepFill(0))
arr[0][0] = 1

for (let i = 1; i < rowLen; i++) {
  console.log(arr[i][0], arr[i - 1][0], arr[i][0] === arr[i - 1][0])
}
