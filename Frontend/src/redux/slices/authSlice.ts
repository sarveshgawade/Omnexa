import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../helpers/axiosInstance'
import {toast} from 'sonner'
import type { ChangePasswordDataType, LoginFormDataType, RegisterFormDataType, ResetPasswordDataType, UpdateProfileDataType, userProfileType } from '@/types/auth.types';


interface AuthState{
    isLoggedIn: boolean,
    role : 'USER' | 'ADMIN' | null,
    data : userProfileType | null
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  role: (localStorage.getItem('role') as 'USER' | 'ADMIN') || 'USER',
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!) as userProfileType : null,
};


type RegisterPayloadType = Omit<RegisterFormDataType, "countryIso">

export const signUp = createAsyncThunk('auth/signup', async function (data : RegisterPayloadType){
    try {
        const response = axiosInstance.post('/api/v1/user/register',data )

        
        toast.promise(response,{
            loading: 'Creating account ...',
            error: (d) => d?.response?.data?.message || 'Error in creating account !',
            success: (d) => d?.data || 'User registered successfully '
        })
        
        return (await response).data

    } catch (error) {
        console.log(error);
    }
})

export const signin = createAsyncThunk('/auth/signin',async function (data : LoginFormDataType) {
    try {
        const response = axiosInstance.post('/api/v1/user/login',data)

        toast.promise(response,{
            loading: 'Authenticating ...',
            error: (d) => d?.response?.data?.message || 'Error in logging in',
            success: (d) =>  d?.data?.message || 'Logged in successfully'           
        })
       
        return (await response)?.data
    } catch (error) {
        console.log(error);
    }
})

export const signout = createAsyncThunk('/auth/signout', async function () {
    try {
        const response = axiosInstance.get('/api/v1/user/logout')

        toast.promise(response, {
            loading: 'Logging out ...',
            success: (data)=> data?.data?.message || 'Logged out successfully',
            error: (d) => d?.response?.data?.message || 'Error in logging out !',
        })
        
        return (await response).data
        
    } catch (error) {
        console.log(error);
        
    }
})

export const getProfile = createAsyncThunk('/auth/getProfile', async function () {
    try {
        const response = axiosInstance.get('/api/v1/user/profile')

        toast.promise(response, {
            loading: 'Getting Profile Info ...',
            // success: (data)=> data?.data?.message || 'Profile Info fetched successfully !',
            error: (d) => d?.response?.data?.message || 'Error in fetching profile info !',
        })

        return (await response).data.user

    } catch (error) {
        console.log(error);
        
    }
})

export const changePassword = createAsyncThunk('/user/change-password', async function (data: ChangePasswordDataType) {
        try {
            const response =  axiosInstance.post('/api/v1/user/change-password',data)

             toast.promise(response,{
                loading: 'Updating password ...',
                error: (d) => d?.response?.data?.message || 'Error in updating password',
                success: (d) =>  d?.data?.message || 'Password updated successfully'           
            })

            return ((await response).data)
            
        } catch (error) {
            console.log(error);
            
        }
})

export const updateProfile = createAsyncThunk('/user/update', async function (data: UpdateProfileDataType) {
        try {
            const response =  axiosInstance.post('/api/v1/user/update',data)

            toast.promise(response,{
                loading: 'Updating profile ...',
                error: (d) => d?.response?.data?.message || 'Error in updating profile',
                success: (d) =>  d?.data?.message || 'Profile updated successfully'           
            })

            return ((await response).data)
            
        } catch (error) {
            console.log(error);
            
        }
})

export const sendResetPasswordEmail = createAsyncThunk('/user/send-reset-password-email', async function(){
    try {
        const response = axiosInstance.post('/api/v1/user/forgot-password')

        toast.promise(response,{
            loading: 'Sending email ...',
            error: (d) => d?.response?.data?.message || 'Error in sending email',
            success: (d) =>  d?.data?.message || 'Email sent to your registered Email-ID'           
        })

        return (await response).data
    } catch (error) {
        console.log(error);
    }
})

export const resetPassword = createAsyncThunk('/user/reset-password', async function (data : ResetPasswordDataType) {
    try {
        const response = axiosInstance.patch(`/api/v1/user/reset-password/${data.token}`,{password: data.password})

         toast.promise(response,{
            loading: 'Resetting password ...',
            error: (d) => d?.response?.data?.message || 'Error in resetting password !',
            success: (d) =>  d?.data?.message || 'Password Reset Successfull !'           
        })

        return (await response).data
        
    } catch (error) {
        console.log(error);
        
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(signin.fulfilled, (state, action)=>{
            
            if(action.payload){
                state.isLoggedIn = true
                state.data = {...action?.payload?.user} 
                state.role = action?.payload?.user?.role

                localStorage.setItem('role',action?.payload?.user?.role )
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                localStorage.setItem('isLoggedIn','true')
            }
            
        })
        .addCase(signout.fulfilled, (state) => {
            localStorage.clear()

            state.isLoggedIn = false
            state.role = null
            state.data = null
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload))
            localStorage.setItem('isLoggedIn','true')
            localStorage.setItem('role',action?.payload?.role)

            state.isLoggedIn = true
            state.data = action?.payload
            state.role = action?.payload?.role
        })
    }
})

export default authSlice.reducer