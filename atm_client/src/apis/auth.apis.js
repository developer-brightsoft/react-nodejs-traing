import axios from "axios"
import { API_URL } from "./config.apis"

export const loginApi = async (input) => {
    const response = await axios.post(`${API_URL}api/v1/auth/login`, input)
    return response;
}

export const registerApi = async (input) => {
    const response = await axios.post(`${API_URL}api/v1/auth/register`, input)
    return response;
}

export const authApi = async () => {
    const response = await axios.get(`${API_URL}api/v1/auth`)
    return response;
}