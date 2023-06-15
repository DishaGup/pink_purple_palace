import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  reducer, // Assuming you only have a single reducer named 'reducer'
});

// Create the Redux store with the rootReducer and apply middleware
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
