function createStore(reducer, initialState, middleFunc) {
  let currState = initialState
  let listeners = []

  if (typeof middleFunc === 'function') {
    return middleFunc(createStore)(reducer, initialState)
  }

  return {
    getState: function () {
      return currState
    },
    dispatch: function (action) {
      const newState = reducer(currState, action)
      currState = newState
      for (const listener of listeners) {
        listener(currState)
      }
    },
    subscribe: function (fun) {
      if (typeof fun === 'function' && !listeners.includes(fun)) {
        listeners.push(fun)
      }
    },
  }
}

const store = createStore(function testReducer(state, action) {
  switch (action.type) {
    case 'test': {
      return { ...state, test: 'hello world' }
    }
    default: {
      return state
    }
  }
}, {})

store.dispatch({ type: 'test' })
console.log('store state', store.getState())

function middwareTest1(store) {
  return function middwareTest1Action(action) {
    const { type } = action
    let dispatch = store.dispatch
    if (typeof type === 'function') {
      dispatch = () => {
        const newType = type()
        store.dispatch({ ...action, type: newType })
      }
    }
    return {
      ...store,
      dispatch,
    }
  }
}

function componese(...middlewares) {
  return function componeseRun(createStore) {
    return function componeseRunMiddware(reducer, initialState) {
      const store = createStore(reducer, initialState)
      const middlewareAPi = {
        dispatch: function () {},
        getState: store.getState,
      }
      const funs = middlewares.map((midd) => midd(middlewareAPi))
      const dispatch = funs.reduce((prev, fun) => fun(prev))
      return {
        ...store,
        dispatch,
      }
    }
  }
}
