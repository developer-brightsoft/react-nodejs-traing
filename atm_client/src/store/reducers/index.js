import { combineReducers } from "redux";
import { LOGOUT } from "../../constants/actionTypes";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth.reducers";
import atm from "./atm.reducers";

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["authLoading", "user", "isAuthenticated"],
    debug: false,
};

const appReducer = combineReducers({
    auth: persistReducer(authPersistConfig, auth),
    atm,
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;
