import axios from "axios"
export const apiUrl = "https://blu3labs-blufield-backend.blu3.app/"

export const api = axios.create({
    baseURL: apiUrl,
})