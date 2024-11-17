import axios from "axios"

const baseUrl = "http://localhost:8080/"

const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json"
    }
})

export default Axios