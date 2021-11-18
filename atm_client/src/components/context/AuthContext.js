import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { apiUrl, SET_AUTH, LOCAL_STORAGE_TOKEN_NAME } from "./constant";
import setAuthToken from "./Token";
import axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: false,
        isAuthenticated: false,
        user: null
    })

    // authenticated
    const setAuthenticated = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}api/v1/auth`)
            if (response.data.user) {
                dispatch({
                    type: SET_AUTH,
                    payload: {isAuthenticated: true, user: response.data.user}
                })
            }
            else{
                dispatch({
                    type: SET_AUTH,
                    payload: {isAuthenticated: false, user:null}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: SET_AUTH, 
                payload:{isAuthenticated:false, user: null}
            })
        }
    }

    useEffect(() => { setAuthenticated() }, [])

    // register
    const register = async input => {
        try {
            const response = await axios.post(`${apiUrl}api/v1/auth/register`, input)
            if(response.data.user){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.PRIVATE_TOKEN)
                dispatch({
                    type: SET_AUTH,
                    payload: {isAuthenticated: true, user: response.data.user}
                })
                return response.data
            }
        } catch (err) {
            return({
                message: err.message
            })
        }
    }

    // login 
    const login = async input => {
        try {
            const response = await axios.post(`${apiUrl}api/v1/auth/login`, input)
            if(response.data.user){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.PRIVATE_TOKEN)
                dispatch({
                    type: SET_AUTH,
                    payload: {isAuthenticated: true, user: response.data.user}
                })

                return response.data
            }
            if(response.data.sign === false){
                return response.data
            }
        }catch(err){
            return ({
                message: err.message
            })
        }
    }

    // logout

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: SET_AUTH, 
            payload:{isAuthenticated:false, user: null}
        })
    }

    const AuthContextData = {authState, register, login, logoutUser, setAuthenticated}
    
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider