const proxyTarget = {
  test: 'hello world',
  arr: ['test'],
  target: {
    a: [],
  },
}
const obj = new Proxy(proxyTarget, {
  get: function (target, prop, reciver) {
    console.log('get ', target, prop, reciver)
    return target[prop]
  },
  set: function (target, prop, value, reciver) {
    console.log('set ', target, prop, value, reciver)
    target[prop] = value
  },
})

console.log('======>>>>>>>>')
// obj.target = { a: ['test'] }
// console.log()
obj.target.a = ['hello wolrd']
// console.log()
// console.log(obj.target.a)

console.log('======>>>>>>>>')
obj.arr = ['test hello world']
