import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { enableBatching } from "redux-batched-actions";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/root";

const enhancers = [];
const middleware = [thunk, routerMiddleware()];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(enableBatching(rootReducer), composedEnhancers);

export default store;
