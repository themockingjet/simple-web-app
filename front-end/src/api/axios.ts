//
//
//

import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default axios.create({
    //
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
