let { count } = require('./lib.cjs')

console.log('count', count)

setTimeout(() => {
  console.log('timeout count', count)
}, 1100)

count = 1000
