/**
 *
 * new 执行的操作
 * 1. 创建一个新对象
 * 2. 将构造函数的作用域赋给新对象（即 this 指向这个新对象）
 * 3. 执行构造函数中代码（为对象添加属性）
 * 4. 返回新对象
 */
/**
 * 实现 new 功能
 * @param {function} objFun 构造函数
 * @param  {...any} args
 */
function newObj(objFun, ...args) {
  const newObject = Object.create(objFun.prototype)
  const newFunObj = objFun.apply(newObject, args)
  return typeof newFunObj === 'object' ? newFunObj : newObject
}

function Test(name) {
  this.name = name
}

Test.prototype.say = function () {
  console.log(this.name + ' say hello word')
}

const obj = newObj(Test, 'Test') // 创建对象

obj.say() // 验证原型

console.log(obj instanceof Test) // 验证构造函数
