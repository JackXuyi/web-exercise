/**
 * @author xuyi
 */
import { createAction } from "redux-actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import exampleReducer, {
  action,
  asyncAction,
  initState,
  createExampleAction,
  fetchList
} from "../examples";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const createRequest = (actionType, timeOut) => {
  const promise = new Promise((resolve, reject) => {
    const timer1 = setTimeout(() => {
      clearTimeout(timer2);
      resolve({ type: actionType.accept, payload: { test: "test" } });
    }, timeOut);

    const timer2 = setTimeout(() => {
      clearTimeout(timer1);
      resolve({ type: actionType.reject });
    }, 1000);
  });
  return promise;
};

describe("examples reducer单元测试", () => {
  test("examples reducers初始化", () => {
    expect(exampleReducer(undefined, {})).toEqual({
      counter: 0,
      loading: false,
      data: {}
    });
  });

  test("测试Action", () => {
    expect(exampleReducer(initState, { type: action })).toEqual({
      counter: 1,
      loading: false,
      data: {}
    });
  });

  test("测试asyncAction", async () => {
    expect(exampleReducer(initState, { type: asyncAction.pending })).toEqual({
      counter: 0,
      loading: true,
      data: {}
    });

    const data1 = await createRequest(asyncAction, 500);
    expect(exampleReducer(initState, data1)).toEqual({
      counter: 0,
      loading: false,
      data: { test: "test" }
    });

    const data2 = await createRequest(asyncAction, 1300);
    expect(exampleReducer(initState, data2)).toEqual({
      counter: 0,
      loading: false,
      data: {}
    });
  });

  describe("mock测试异步action", () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    test("测试异步action，asyncAction", () => {
      fetchMock.postOnce("/v1/main/list", {
        body: { todos: "do something" },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "*"
        }
      });
      const expectedActions = [
        { type: asyncAction.pending },
        { type: asyncAction.accept, payload: { todos: "do something" } }
      ];
      const store = mockStore({ data: {} });
      return store.dispatch(fetchList()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
