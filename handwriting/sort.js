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

const baseArr = [100, 50, 80, 40, 60, 90, 30, 55, 180, 160, 120]
const quickSortArr = baseArr.slice()
console.log('quickSort before', quickSortArr)
quickSort(quickSortArr)
console.log('quickSort after', quickSortArr)
