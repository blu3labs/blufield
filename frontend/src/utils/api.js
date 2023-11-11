import axios from "axios"
export const apiUrl = "http://localhost:5001/"

export const api = axios.create({
    baseURL: apiUrl,
})
