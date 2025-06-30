import axios from 'axios'

const axiosInstance =  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // baseURL: import.meta.env.VITE_BACKEND_URL_DEV,
    withCredentials: true
})

export default axiosInstance