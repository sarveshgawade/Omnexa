import axiosInstance from "@/helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {toast} from 'sonner'

const initialState = {
    products: []
}

export const getAllProducts = createAsyncThunk('/products/get' , async function () {
    try {
        const response = axiosInstance.get('/api/v1/product/all')

        console.log((await response).data);

        toast.promise(response, {
            loading: 'Loading...',
            success: (await response)?.data?.message,
            error: 'Error in Loading Products ',
        });

        return (await response)?.data?.products
        
    } catch (error) {
        console.log(error);
    }
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state,action) => {
                if(action.payload){
                    state.products = action?.payload
                }
            })
    }
})

export default productSlice.reducer