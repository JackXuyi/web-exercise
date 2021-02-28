//a.js
exports.done = false

var b = require('./b.common.cjs')
console.log('在a.js中，b.done = %j', b.done)

exports.done = true
console.log('a.js执行完毕！')
