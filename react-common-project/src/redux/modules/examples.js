/**
 * @author xuyi
 */
import { handleActions, createAction } from "redux-actions";
import { createAsyncActionType, createAsyncAction } from "utils/request";

export const action = "exampleAction";
export const asyncAction = createAsyncActionType("asyncAction");

export const initState = {
  counter: 0,
  loading: false,
  data: {}
};

const exampleRedux = handleActions(
  {
    [action]: state => ({ ...state, counter: state.counter + 1 }),
    [asyncAction.pending]: state => ({ ...state, loading: true, data: {} }),
    [asyncAction.accept]: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload
    }),
    [asyncAction.reject]: state => ({ ...state, loading: false })
  },
  initState
);

export default exampleRedux;

export const createExampleAction = createAction(action);

export const fetchList = createAsyncAction(
  asyncAction,
  "/v1/main/list",
  "POST"
);
