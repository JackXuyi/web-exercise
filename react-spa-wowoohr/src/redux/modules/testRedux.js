/**
 * @author xuyi 2018-09-04
 * @flow
 */
import { createAction, handleActions } from "redux-actions";
import {
  createAsyncActionType,
  createAsyncAction,
  createRelatedAsyncAction
} from "../../utils/request";

const testActionType = "testaction";
const fetchListAction = createAsyncActionType("fetchList");
const fetchListActionRelated = createAsyncActionType("fetchListRelated");
const actionRelated = createAsyncActionType("actionRelated");

const testRedux = handleActions(
  {
    // 同步
    [testActionType]: state => ({ ...state, msg: "hello world!" }),
    // 异步请求
    [fetchListAction.pending]: state => ({ ...state }),
    [fetchListAction.accept]: (state, action) => ({
      ...state,
      homeData: action.payload
    }),
    [fetchListAction.reject]: state => ({ ...state }),
    [fetchListActionRelated.pending]: state => ({ ...state }),
    [fetchListActionRelated.accept]: (state, action) => ({
      ...state,
      relatedHomedata: action.payload
    }),
    [fetchListActionRelated.reject]: state => ({ ...state }),
    [actionRelated.accept]: (state, action) => ({
      ...state,
      data: { ...state.homeData },
      relatedData: { ...state.relatedHomedata }
    })
  },
  {
    msg: "",
    homeData: {},
    relatedHomedata: {},
    data: {},
    relatedData: {}
  }
);

export default testRedux;

// 同步action
export const createTestAction = createAction(testActionType);

// 异步action
export const fetchList: (obj: Object) => any = createAsyncAction(
  "/v1/main/list",
  fetchListAction,
  "POST"
);

// 关联接口异步action
export const fetchRelatedList: (obj: any) => any = createRelatedAsyncAction(
  [
    {
      url: "/v1/main/list",
      actionType: fetchListAction,
      method: "POST"
    },
    {
      url: "/v1/main/list",
      actionType: fetchListActionRelated,
      method: "POST"
    }
  ],
  actionRelated
);
