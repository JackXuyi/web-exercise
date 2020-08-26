import { count } from './lib.mjs'

console.log('count', count)

setTimeout(() => {
  console.log('timeout count', count)
}, 1100)

count = 1000
