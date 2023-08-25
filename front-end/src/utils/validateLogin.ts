//
//
//

import axios from "../api/axios";

export const passwordValidation = {
    id: "password",
    name: "password",
    label: "Password:",
    type: "password",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
    },
};

export const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
