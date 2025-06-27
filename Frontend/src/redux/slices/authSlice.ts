import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../helpers/axiosInstance'
import {toast} from 'sonner'
import type { LoginFormDataType, RegisterFormDataType } from '@/types/auth.types';


interface AuthState{
    isLoggedIn: boolean,
    role : 'USER' | 'ADMIN',
    data : {}
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  role: (localStorage.getItem('role') as 'USER' | 'ADMIN') || 'USER',
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!) : {},
};




export const signUp = createAsyncThunk('auth/signup', async function (data : RegisterFormDataType){
    try {
        const response = axiosInstance.post('/api/v1/user/register',data )

        
        toast.promise(response,{
            loading: 'Creating account ...',
            error: (d) => d?.response?.data?.message,
            success: (d) => d?.data
        })
        
        return (await response).data

    } catch (error) {
        console.log(error);
    }
})

export const signin = createAsyncThunk('/auth/signin',async function (data : LoginFormDataType) {
    try {
        const response = axiosInstance.post('/api/v1/user/login',data)

        console.log((await response).data);
        
        // toast.promise(response,{
        //     loading: 'Authenticating ...',
        //     success: (data)=> data?.data?.message,
        //     error: (data)=>  data?.response?.data                 
        // })

        // return (await response).data
    } catch (error) {
        console.log(error);
    }
})

// export const signout = createAsyncThunk('/auth/signout', async function () {
//     try {
//         const response = axiosInstance.get('/user/logout')

//         // console.log(`res in slide --> ${(await response).data}`);

//         toast.promise(response, {
//             loading: 'Logging out ...',
//             success: (data)=> {
//                 return data?.data?.message
//             },
//             error: (data) => data?.data?.message
//         })
        
//         return (await response).data
        
//     } catch (error) {
//         console.log(error);
        
//     }
// })

// export const getProfile = createAsyncThunk('/auth/getProfile', async function () {
//     try {
//         const response = axiosInstance.get('/user/my-profile')
//         // console.log((await response).data.userProfile)

//         return (await response).data.userProfile

//     } catch (error) {
//         console.log(error);
        
//     }
// })

// export const updateProfile = createAsyncThunk('/user/update', async function (data) {
//         try {

//             // console.log(data);
            
//             const response =  axiosInstance.post('/user/update',data)

//             toast.promise(response,{
//                 loading: 'Updating ...',
//                 error: 'Error while updating',
//                 success : d => d?.data?.message
//             })

//             return ((await response).data)
            
//         } catch (error) {
//             console.log(error);
            
//         }
// })


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // builder
        // .addCase(signin.fulfilled, (state,action)=> {
        //     localStorage.setItem('data',JSON.stringify(action?.payload))
        //     localStorage.setItem('role',action?.payload?.existingUser?.role)
        //     localStorage.setItem('isLoggedIn',true)

        //     state.isLoggedIn = true
        //     state.data = action?.payload
        //     state.role = action?.payload?.existingUser?.role 
        // })
        // .addCase(signout.fulfilled, (state) => {
        //     localStorage.clear()

        //     state.isLoggedIn = false
        //     state.role = ''
        //     state.data = {}
        // })
        // .addCase(getProfile.fulfilled, (state, action) => {
        //     localStorage.setItem('data', action?.payload)
        //     localStorage.setItem('isLoggedIn',true)
        //     localStorage.setItem('role',action?.payload?.role)

        //     state.isLoggedIn = true
        //     state.data = action?.payload
        //     state.role = action?.payload?.role
        // })
    }
})

export default authSlice.reducer