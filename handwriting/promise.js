const MyPromiseStatus = {
  pending: 'pending',
  resolve: 'fulfilled',
  reject: 'rejected',
}

class MyPromise {
  constructor(createFun) {
    this.status = MyPromiseStatus.pending
    this.value = undefined
    this.reason = undefined
    this.thenTaskQueue = []
    this.rejectTaskQueue = []

    createFun(this._resolve, this._reject)
  }

  _resolve = (value) => {
    this.status = MyPromiseStatus.resolve
    this.value = value

    while (this.thenTaskQueue.length) {
      try {
        const task = this.thenTaskQueue.shift()
        task(this.value)
      } catch (e) {
        this._reject(e)
        break
      }
    }
  }

  _reject = (reason) => {
    this.status = MyPromiseStatus.reject
    this.reason = reason

    while (this.rejectTaskQueue.length) {
      try {
        const task = this.rejectTaskQueue.shift()
        task(this.reason)
      } catch (e) {
        if (this.rejectTaskQueue.length) {
          this._reject(e)
        } else {
          throw new Error(e)
        }
      }
    }
  }

  _isFunction = (fun) => {
    return fun && typeof fun === 'function'
  }

  then(resolve, reject) {
    if (this._isFunction(resolve)) {
      this.thenTaskQueue.push(resolve)
    }
    if (this._isFunction(reject)) {
      this.rejectTaskQueue.push(reject)
    }
    return this
  }

  catch(reject) {
    if (this._isFunction(reject)) {
      this.rejectTaskQueue.push(reject)
    }
    return this
  }
}

new MyPromise((resolve) => {
  console.log('create promise', Date.now())
  setTimeout(() => {
    resolve('setTimeout success')
  }, 100)
})
  .then((value) => {
    console.log('first then', value, Date.now())
  })
  .then((value) => {
    console.log('second then', value)
    throw new Error('second throw error')
  })
  .then((value) => {
    console.log('third then', value)
  })
  .catch((e) => {
    console.error('first catch error', e)
  })
  .catch((e) => {
    console.error('second catch error', e)
    throw new Error('second catch own error')
  })
  .catch((e) => {
    console.error('third catch error', e)
  })
