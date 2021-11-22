import { SET_ATM } from "../../constants/actionTypes"

const initialState = {
    ATMs: [],
};

const atm = (state = initialState, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case SET_ATM:
            return {
                ...state,
                ATMs: payload?.ATMs || state.ATMs,
                queue: payload?.queue || state.queue,
                processedClient: payload?.processedClient || state.processedClient,
            }
        default:
            return state
    }
}

export default atm