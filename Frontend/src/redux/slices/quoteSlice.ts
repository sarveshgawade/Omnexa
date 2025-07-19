import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Quote } from "@/types/quote.types";
import axiosInstance from "@/helpers/axiosInstance";
import { toast } from "sonner";

const initialState = {
    quotes: [],
    quoteDetails: null
}


export const addQuote = createAsyncThunk("quote/add", async (quote: Quote) => {
    const { product, productQuantityType, agreeToTerms,productName, ...payload } = quote;
    const response = axiosInstance.post("/api/v1/quote/add", payload)

    toast.promise(response, {
        loading: "Adding quote...",
        success: "Quote added successfully",
        error: (error) => error?.response?.data?.message || "Failed to add quote"
    })

    return (await response).data
})

export const getQuotesByUser = createAsyncThunk("quote/getQuotesByUser", async () => {
    const response = axiosInstance.get("/api/v1/quote/getQuoteByUser")
    // console.log((await response).data)

    toast.promise(response, {
        loading: "Fetching quotes...",
        success: "Quote fetched successfully !",
        error: (error) => error?.response?.data?.message || "Error in fetching quotes !"
    })

    return (await response)?.data?.quotes
})

const quoteSlice = createSlice({
    name: "quote",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuotesByUser.fulfilled, (state, action) => {
            state.quotes = action.payload
        })
    }
})

export default quoteSlice.reducer