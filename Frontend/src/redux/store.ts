import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import productSliceReducer from './slices/productSlice'
import authSliceReducer from './slices/authSlice'
import contactSliceReducer from './slices/contactSlice'


const persistConfiguration = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    // slices
    products: productSliceReducer ,
    auth: authSliceReducer,
    contact: contactSliceReducer,
    

})

const persistedReducer = persistReducer(persistConfiguration,reducer)

const store = configureStore({
    reducer:persistedReducer,
    devTools: true,

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store