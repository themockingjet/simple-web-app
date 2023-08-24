//
//
//

import axios from "axios";

export const fetchReservations = async () => {
    const response = await axios.get("http://localhost:5000/api/reservations").then((res) => res.data);
    return response;
};
