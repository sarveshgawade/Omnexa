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

export const getAllQuotes = createAsyncThunk("quote/getAllQuotes", async () => {
    const response = axiosInstance.get("/api/v1/quote/all")
    // console.log((await response).data.quotes)
    toast.promise(response, {
        loading: "Fetching quotes...",
        success: "Quotes fetched successfully !",
        error: (error) => error?.response?.data?.message || "Error in fetching quotes !"
    })

    return (await response)?.data?.quotes
})

export const deleteQuoteById = createAsyncThunk("quote/deleteById", async (quoteId: string) => {
    const response = axiosInstance.delete(`/api/v1/quote/delete/${quoteId}`)

    toast.promise(response, {
        loading: "Deleting quote...",
        success: "Quote deleted successfully !",
        error: (error) => error?.response?.data?.message || "Error in deleting quote !"
    })

    return (await response)?.data
})

const quoteSlice = createSlice({
    name: "quote",
    initialState,
    reducers: {
        clearQuotes: (state) => {
            state.quotes = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuotesByUser.fulfilled, (state, action) => {
            state.quotes = []
            state.quotes = action.payload
        })
        builder.addCase(getAllQuotes.fulfilled, (state, action) => {
            state.quotes = []
            state.quotes = action.payload
        })
    }   
})


export const { clearQuotes } = quoteSlice.actions

export default quoteSlice.reducer