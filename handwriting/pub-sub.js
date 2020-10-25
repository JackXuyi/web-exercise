class MyCustomEvent {
  static eventMap = {}

  add(eventType, callback) {
    if (!MyCustomEvent.eventMap[eventType]) {
      MyCustomEvent.eventMap[eventType] = []
    }
    MyCustomEvent.eventMap[eventType].push(callback)
  }

  remove(eventType, callback) {
    if (MyCustomEvent.eventMap[eventType]) {
      const index = MyCustomEvent.eventMap[eventType].findIndex(
        (cb) => cb == callback,
      )
      if (index > -1) {
        MyCustomEvent.eventMap[eventType].splice(index, 1)
      }
    }
  }

  fire(eventType, event) {
    const events = MyCustomEvent.eventMap[eventType]
    if (events) {
      events.forEach((cb) => cb(event))
    }
  }
}

const event1 = new MyCustomEvent()
const event2 = new MyCustomEvent()

const cb1 = (e) => console.log('cb1,', e)
const cb2 = (e) => console.log('cb2,', e)

event1.add('test', cb1)
event2.add('test', cb2)
event1.fire('test', 'hello world')
event1.remove('test', cb1)
event2.fire('test', 'remove after hello world')
