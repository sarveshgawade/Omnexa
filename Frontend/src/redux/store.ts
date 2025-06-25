import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'


const persistConfiguration = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    // slices

})

const persistedReducer = persistReducer(persistConfiguration,reducer)

const store = configureStore({
    reducer:persistedReducer,
    devTools: true
})

export default store