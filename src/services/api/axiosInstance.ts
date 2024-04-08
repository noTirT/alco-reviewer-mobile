import axios from "axios"
import { REACT_APP_API_URL as apiUrl } from "@env"

const instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
});

export default instance
