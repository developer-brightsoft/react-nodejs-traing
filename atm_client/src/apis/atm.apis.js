import axios from "axios"
import { API_URL } from "./config.apis"

export const getATMsApi = async () => {
    const response = await axios.get(`${API_URL}api/v1/atms`)
    return response;
}

export const createAtmApi = async (input) => {
    const response = await axios.post(`${API_URL}api/v1/atms`, input)
    return response;
}

export const createPersonApi = async (input) => {
    const response = await axios.post(`${API_URL}api/v1/atms/people`, input)
    return response;
}

export const deleteAtmApi = async (id) => {
    const response = await axios.delete(`${API_URL}api/v1/atms/${id}`)
    return response;
}



