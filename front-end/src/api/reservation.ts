//
//
//

import axios from "./axios";

export const fetchReservations = async () => {
    const response = await axios.get("/api/reservations").then((res) => res.data);
    return response;
};
