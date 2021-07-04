function asyncCall(fun, time) {
  const timer = setTimeout(() => {
    clearTimeout(timer)
    fun && fun()
  }, time)
}

class TaskQueue {
  constructor() {
    this.tasks = []
    const task = this.createTask('Task Queue constructor')
    this.pushTask(task)

    // start
    asyncCall(this.next, 0)
  }

  sleep(time) {
    const task = this.createAsyncTask(time, 'sleep ' + time + 's')
    this.pushTask(task)
    return this
  }

  eat(name) {
    const task = this.createTask('eat ' + name)
    this.pushTask(task)
    return this
  }

  sleepFirst() {
    const task = this.createTask('sleep first')
    this.pushTask(task, true)
    return this
  }

  next = () => {
    if (this.tasks.length) {
      const task = this.tasks.shift()
      task()
    }
  }

  createAsyncTask = (time, name) => {
    const task = () => {
      asyncCall(() => {
        console.log('This async task is', name)
        this.next()
      }, time * 1000)
    }
    return task
  }

  createTask = (name) => {
    const task = () => {
      console.log('This task is', name)
      this.next()
    }
    return task
  }

  pushTask(task, isFirst = false) {
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
}

new TaskQueue().sleep(3).eat('dinner').eat('supper').sleepFirst()
