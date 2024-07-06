import  axios from "axios";

export const backendBaseURI  = "http://localhost:8080";

export const api  = axios.create({
    baseURL : backendBaseURI,
    withCredentials: true
})

api.interceptors.request.use(function (config){
    const token= localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})