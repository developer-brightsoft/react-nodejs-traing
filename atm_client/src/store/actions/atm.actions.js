import { toast } from "react-toastify";
import { SET_ATM } from "../../constants/actionTypes"
import { createAtmApi, createPersonApi, deleteAtmApi, getATMsApi } from "../../apis/atm.apis"

export const getATMs = () => {
    return async (dispatch) => {
        try {
            const response = await getATMsApi();
            if (response.data) {
                dispatch({
                    type: SET_ATM,
                    payload: {
                        ATMs: response.data?.atm,
                        queue: response.data?.queue,
                        processedClient: response.data?.processedClient
                    }
                })
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
}

export const createAtm = (input) => {
    return async (dispatch) => {

        try {
            const response = await createAtmApi(input);
            if (response.data) {
                dispatch({
                    type: SET_ATM,
                    payload: {
                        ATMs: response.data,
                    }
                })
            }
            toast.success('Create ATM successfully')
        } catch (err) {
            toast.error(err.message)
        }
    }
}

export const createPerson = async (input) => {
    try {
        const response = await createPersonApi(input);
        if (response.data) {
            toast.success('Create person successfully');
        }
    } catch (err) {
        toast.error(err.message);
    }
}

export const deleteAtm = async (id) => {
    try {
        const response = await deleteAtmApi(id);
        if (response.data) {
            toast.success('Delete ATM successfully!.')
        }
    } catch (err) {
        toast.error(err.message)
    }
}