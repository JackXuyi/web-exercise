function quickSort(arr, start, end) {
  const compareStart = start === undefined ? 0 : start
  const compareEnd = end === undefined ? arr.length - 1 : end
  let left = compareStart
  let right = compareEnd

  const baseValue = arr[left] // 基准点
  while (left < right) {
    // 查找右侧比当前基准元素小的
    while (left < right && arr[right] >= baseValue) {
      right--
    }
    // 右侧元素放置到左侧元素位置上
    if (right > left) {
      arr[left] = arr[right]
      left++
    }
    // 查找左侧比基准元素大的
    while (left < right && arr[left] < baseValue) {
      left++
    }
    // 左侧元素放入右侧查找到小的元素位置上
    if (left < right) {
      arr[right] = arr[left]
      right--
    }
  }
  arr[left] = baseValue
  if (left - 1 > compareStart) {
    quickSort(arr, compareStart, left - 1)
  }
  if (left + 1 < compareEnd) {
    quickSort(arr, left + 1, compareEnd)
  }
}

function insertSort(arr) {
  if (arr && arr.length <= 1) {
    return arr
  }

  const len = arr.length
  for (let i = 1; i < len; i++) {
    const curr = arr[i]
    let prev = i - 1
    while (prev >= 0 && curr < arr[prev]) {
      arr[prev + 1] = arr[prev]
      prev--
    }
    arr[prev + 1] = curr
  }
}

const baseArr = [100, 50, 80, 40, 60, 90, 30, 55, 180, 160, 120]
const quickSortArr = baseArr.slice()
console.log('quickSort before', quickSortArr)
quickSort(quickSortArr)
console.log('quickSort after', quickSortArr)

const insertSortArr = baseArr.slice()
console.log('insertSort before', insertSortArr)
insertSort(insertSortArr)
console.log('insertSort after', insertSortArr)

// *hhiii*hhhyyy => **hhiiihhhyyy
function sortChar(str) {
  if (!str) {
    return ''
  }
  let retStr = str.split('').filter(Boolean)
  const len = retStr.length
  let left = 0
  let right = len - 1
  while (left < right) {
    while (retStr[right] !== '*' && right > 0) {
      right--
    }
    while (retStr[left] === '*' && left < len) {
      left++
    }

    if (left < right) {
      retStr[right] = retStr[left]
      retStr[left] = '*'
      left++
      right--
    }
  }
  return retStr.join('')
}

const str = '*hhiii*hhhyyy'
console.log('sortChar before', str)
console.log('sortChar after', sortChar(str))

function maxNoRepeatSubStr(str) {
  let result = 0
  let i = 0
  let j = 0
  const len = str.length
  let subStr = ''
  const map = {} // 记录遍历的字符
  while (i < len && j < len) {
    while (j < len - 1 && !map[str[j]]) {
      map[str[j]] = true
      if (j === len - 1) {
        break
      }
      j++
    }
    if (subStr.length < j - i - 1) {
      result = j - i - 1
      subStr = str.substr(i, result)
    }
    if (str[i] === str[j]) {
      map[str[i]] = false
      i++
    } else {
      while (str[i] !== str[j] && i < j) {
        map[str[i]] = false
        if (i === j) {
          break
        }
        i++
      }
    }
  }
  console.log('subStr', subStr)
  return result
}
console.log(maxNoRepeatSubStr('abcdaefghkd'))
