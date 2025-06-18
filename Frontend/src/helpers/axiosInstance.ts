import axios from 'axios'

const axiosInstance =  axios.create({
    baseURL: 'http://localhost:8087/api/v1',
    withCredentials: true
})

export default axiosInstance