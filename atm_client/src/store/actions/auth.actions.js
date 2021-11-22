import { LOGOUT, SET_AUTH } from "../../constants/actionTypes"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constants/keys";
import { accessTokenConfig } from "../../apis/config.apis"
import { loginApi, registerApi } from "../../apis/auth.apis";
import { toast } from 'react-toastify';

export const login = (input) => {
    return async (dispatch) => {
        try {
            const response = await loginApi(input);
            if (response.data.user) {
                dispatch({
                    type: SET_AUTH,
                    payload: { isAuthenticated: true, user: response.data.user }
                })
                accessTokenConfig(response.data.PRIVATE_TOKEN)
                toast.success("Login successfully")
            } else {
                throw new Error(response.data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
}

export const register = (input) => {
    return async (dispatch) => {
        try {
            const response = await registerApi(input);
            if (response.data.user) {
                dispatch({
                    type: SET_AUTH,
                    payload: { isAuthenticated: true, user: response.data.user }
                })
                accessTokenConfig(response.data.PRIVATE_TOKEN)
            } else {
                throw new Error(response.data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: LOGOUT,
            payload: { isAuthenticated: false, user: null }
        })
    }
}