const obj = {
  test1: 11,
  test2: 12,
  test3: 13,
  test4: 14,
  test5: 15,
}

function buildWalk(types = ['next', 'return', 'throw']) {
  return function () {
    const keys = Object.keys(obj)
    let index = 0
    const retObj = {
      next() {
        return {
          done: keys.length <= index,
          value: obj[keys[index++]],
        }
      },
      return() {
        index = 0
        return {
          done: true,
        }
      },
      throw() {
        index = 0
        return {
          done: true,
        }
      },
    }
    return types.reduce((prev, key) => {
      if (retObj[key]) {
        prev[key] = retObj[key]
      }
      return prev
    }, {})
  }
}

obj[Symbol.iterator] = buildWalk(['next', 'return'])

for (const value of obj) {
  console.log('value: ', value)
}

console.log('next ===============>>>>')

obj[Symbol.iterator] = buildWalk(['next'])

for (const value of obj) {
  console.log('value: ', value)
}

console.log('second generate ===============>>>>')
for (const value of obj) {
  console.log('value: ', value)
}

console.log('iterator to array', Array.from(obj))

const { ...other } = obj
console.log('iterator obj decode', ...other)
const { ...others } = {
  test1: 11,
  test2: 12,
  test3: 13,
  test4: 14,
  test5: 15,
}
console.log('normal obj decode', others)
