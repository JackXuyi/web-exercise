//b.js
exports.done = false

var a = require('./a.common.cjs')
console.log('在b.js中，a.done = %j', a.done)

exports.done = true
console.log('b.js执行完毕！')
