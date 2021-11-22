import { SET_AUTH } from "../../constants/actionTypes"

const initialState = {
    authLoading: false,
    user: null,
    isAuthenticated: false,
};

const auth = (state = initialState, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                user: payload?.user,
                isAuthenticated: payload?.isAuthenticated,
            }

        default:
            return state
    }
}

export default auth