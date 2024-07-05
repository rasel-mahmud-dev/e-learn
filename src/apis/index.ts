import  axios from "axios";

export const backendBaseURI  = "http://localhost:8080";

export const api  = axios.create({
    baseURL : backendBaseURI,
})