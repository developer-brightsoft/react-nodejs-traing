import { createContext, useEffect, useState } from "react";
import { apiUrl } from "./constant";
import axios from 'axios'

export const AtmContext = createContext()

const AtmContextProvider = ({children}) => {

    // get atm
    const getAtm = async() => {
        try {
            const response = await axios.get(`${apiUrl}api/v1/atms`)
            if(response.data){
                return response.data
            }
        }catch(err){
            return ({
                message: err.message
            })
        }
    }

    // add atm
    const postAtm = async input => {
        try{
            const response = await axios.post(`${apiUrl}api/v1/atms`, input)
            if(response.data){
                return response.data
            }
        }catch(err){
            return ({
                message: err.message
            })
        }
    }

    // add people
    const addPeople = async input => {
        try{
            const response = await axios.post(`${apiUrl}api/v1/atms/people`, input)
            if(response.data.success){
                return response.data
            }
        }catch(err){
            return({
                message: err.message
            })
        }
    }

    //remove atm
    const removeAtm = async id => {
        try {
            const response = await axios.delete(`${apiUrl}api/v1/atms/${id}`)
            if(response.data.remove){
                return response.data.remove
            }
        } catch(err){
            return ({
                message: err.message
            })
        }
    }


 
    const AtmContextData = {postAtm, getAtm, removeAtm, addPeople}

    return (
        <AtmContext.Provider value={AtmContextData}>
            {children}
        </AtmContext.Provider>
    )
}

export default AtmContextProvider