//
//
//

import axios from "axios";

export const fetchUsers = async () => {
    const response = await axios.get("/api/user").then((res) => res.data);
    return response;
};
