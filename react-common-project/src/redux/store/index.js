/**
 * @author xuyi
 */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../modules";
import DevTools from "../devtools";

const middleWares = applyMiddleware(thunk);
const enhancer = compose(
  middleWares,
  DevTools.instrument()
);

const store = createStore(rootReducer, enhancer);

export default store;
