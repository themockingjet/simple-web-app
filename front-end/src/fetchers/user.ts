//
//
//

import axios from "axios";

export const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/user").then((res) => res.data);
    return response;
};
