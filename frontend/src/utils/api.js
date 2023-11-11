import axios from "axios"
export const apiUrl = "http://192.168.56.33:5001"

export const api = axios.create({
    baseURL: apiUrl,
})
