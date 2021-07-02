class Node {
  constructor(key = null, value = null) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }

  setValue(value) {
    this.value = value
  }
}

class LRUCache {
  constructor(size) {
    this.maxSize = size
    this.count = 0
    this.map = new Map()
    this.head = new Node()
    this.tail = new Node()
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get(key) {
    if (this.map.get(key)) {
      //   console.log('this.map.get(key)', this.map.get(key))
      const currNode = this.pickNode(this.map.get(key))
      this.unshiftNode(currNode)
      return currNode.value
    }
    return null
  }

  put(key, val) {
    if (this.map.get(key)) {
      // 更新
      this.map.get(key).setValue(val)
    } else {
      if (this.count >= this.maxSize) {
        this.delLastNode()
      }
      const newNode = new Node(key, val)
      this.map.set(key, newNode)
      this.appendNode(newNode)
    }
  }

  print() {
    let curr = this.head.next
    console.log('print')
    while (curr && curr.value) {
      console.log(curr.value)
      curr = curr.next
    }
  }

  pickNode(node) {
    const prevNode = node.prev
    const nextNode = node.next
    if (prevNode) {
      prevNode.next = prevNode.next = nextNode
    }
    if (nextNode) {
      nextNode.prev = prevNode
    }

    return node
  }

  unshiftNode(node) {
    const oldNext = this.head.next
    this.head.next = node
    node.next = oldNext
    oldNext.prev = node
    node.prev = this.head
  }

  appendNode(node) {
    const lastNode = this.tail.prev
    lastNode.next = node
    node.next = this.tail
    this.tail.prev = node
    node.prev = lastNode
    this.count++
  }

  delLastNode() {
    this.count--
    const lastNode = this.tail.prev
    const lastNodePrev = lastNode.prev
    lastNodePrev.next = this.tail
    this.tail.prev = lastNodePrev
    // 断开上下文引用
    lastNode.next = null
    lastNode.prev = null
    // 移除引用
    const key = lastNode.key
    this.map.delete(key)
  }
}

const lruCache = new LRUCache(3)

lruCache.put(1, { key: '1' })
lruCache.print()

lruCache.put(2, { key: '2' })
lruCache.print()

lruCache.get(2)
lruCache.print()

lruCache.put(3, { key: '3' })
lruCache.print()

lruCache.put(4, { key: '4' })
lruCache.print()

lruCache.get(4)
console.log('lruCache.get(3)', lruCache.get(3))
lruCache.print()

lruCache.put(5, { key: '5' })
lruCache.print()

lruCache.put(6, { key: '6' })
lruCache.print()
