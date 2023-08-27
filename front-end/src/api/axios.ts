//
//
//

import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default axios.create({
    //
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
    },
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        withCredentials: true,
    },
});
