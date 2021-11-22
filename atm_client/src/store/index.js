import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);
export default store;
