import axiosInstance from "@/helpers/axiosInstance";
import type { GalleryImage } from "@/types/gallery.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActivityIcon } from "lucide-react";
import { toast } from "sonner";

interface GalleryState {
    gallery: GalleryImage[]
}

const initialState : GalleryState = {
    gallery: []
}

export const getGalleryImages = createAsyncThunk('/gallery/get', async function () {
    try {
        const response = axiosInstance.get('/api/v1/gallery/all')

        toast.promise(response, {
            loading: 'Loading Images...'
        });

        return (await response)?.data?.galleryImages[0]?.galleryImages
    } catch (error) {
        console.log(error)
    }
})

export const deleteAllImages = createAsyncThunk('/gallery/delete/all', async function () {
    try {
        const response = axiosInstance.delete('/api/v1/gallery/delete/all')
        
        toast.promise(response, {
            loading: 'Deleting Images...',
            error:  'Error in Deleting Images ! ',
            success : (d) => d?.data?.message || 'Images Deleted Successfully !'
        });

        return (await response)?.data?.success   
    } catch (error) {
        console.log(error)
    }
})

export const deleteImageById = createAsyncThunk('/gallery/delete/id', async function (id: string) {
    try {
        const response = axiosInstance.delete(`/api/v1/gallery/delete/${id}`)

        console.log((await response).data)
        toast.promise(response, {
            loading: 'Deleting Image...',
            error:  'Error in Deleting Image ! ',
            success : (d) => d?.data?.message || 'Image Deleted Successfully !'
        });

        return (await response)?.data?.success
    } catch (error) {
        console.log(error)
    }
})

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGalleryImages.fulfilled,(state,action) => {
            if(action?.payload){
                state.gallery = action?.payload
            }
        })
        .addCase(deleteAllImages.fulfilled,(state,action) => {
            if(action?.payload){
                state.gallery = []
            }
        })
    }
})

export default gallerySlice.reducer