import axiosInstance from "@/helpers/axiosInstance"
import type { ContactFormDataType } from "@/types/contact.types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"

interface ContactState {
    contacts : ContactFormDataType[]
}

const initialState : ContactState = {
    contacts: []
}

export const addNewContact = createAsyncThunk('/contact/add', async (data : ContactFormDataType) => {
    try {
        const response = axiosInstance.post('/api/v1/contact/addNewContact', data)

        toast.promise(response, {
            loading: 'Sending your message ...',
            error: (d) => d?.response?.data?.message || 'Error in sending message !',
            success: (d) => d?.data?.message || 'Message sent successfully !'
        })

        return (await response).data
    } catch (error) {
        console.log(error);
        
    }
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers : {} ,
    extraReducers: (builder) => {}
})

export default contactSlice.reducer