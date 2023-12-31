//
//
//

import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

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
