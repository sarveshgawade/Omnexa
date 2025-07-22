import axiosInstance from "@/helpers/axiosInstance";
import type { Product } from "@/types/product.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {toast} from 'sonner'

interface ProductState{
    products: Product[],
    productDetails: Product | null
}

const initialState : ProductState = {
    products: [],
    productDetails : null
}

export const getAllProducts = createAsyncThunk('/products/get' , async function () {
    try {
        const response = axiosInstance.get('/api/v1/product/all')

        toast.promise(response, {
            loading: 'Loading...',
            error: 'Error in Loading Products ',
        });

        return (await response)?.data?.products
        
    } catch (error) {
        console.log(error);
    }
})

export const getProduct = createAsyncThunk('/product/get', async function (productId) {
    try {
        const response = axiosInstance.get(`/api/v1/product/${productId}`)

        toast.promise(response, {
            loading: 'Loading...',
            error: `Error in Loading Product with ID: ${productId}`,
        });

        return (await response)?.data?.product
        
    } catch (error) {
        console.log(error);
        
    }
})

export const deleteProduct = createAsyncThunk('/product/delete', async function (productId:string) {
    try {
        const response = axiosInstance.delete(`/api/v1/product/delete/${productId}`)

        toast.promise(response, {
            loading: 'Deleting...',
            error: (d) => d?.response?.data?.message || 'Error in Deleting Product !',
            success: () =>  'Product Deleted Successfully',
        })

        return (await response)?.data
    } catch (error) {
        console.log(error);
    }
})

export const addProduct = createAsyncThunk('/product/add', async function (productData: FormData) {
    try {
        const response = axiosInstance.post('/api/v1/product/add', productData)
        
        toast.promise(response, {
            loading: 'Adding product...',
            error: (d) => d?.response?.data?.message || 'Error in Adding Product !',
            success: () =>  'Product Added Successfully !',
        })

        return (await response)?.data
    } catch (error) {
        console.log(error);
    }
})

export const updateProduct = createAsyncThunk('/product/update', async function (productData: FormData) {
    try {
        // Extract productId from FormData
        const productId = productData.get('_id');
        if (!productId) {
            throw new Error('Product ID (_id) is required in FormData');
        }

        const response = axiosInstance.patch(`/api/v1/product/update/${productId}`, productData);

        toast.promise(response, {
            loading: 'Updating product...',
            error: (d) => d?.response?.data?.message || 'Error in Updating Product!',
            success: () => 'Product Updated Successfully!',
        });

        return (await response)?.data;
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
                if(action?.payload){
                    state.products = action?.payload
                }
            })

            .addCase(getProduct.fulfilled, (state,action) => {
                if(action?.payload){
                    state.productDetails = action?.payload
                }
            })
    }
})

export default productSlice.reducer