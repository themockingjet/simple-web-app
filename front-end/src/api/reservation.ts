//
//
//

import { axiosAuth } from "./axios";

export const fetchReservations = async () => {
    const response = await axiosAuth.get("/api/reservations").then((res) => res.data);
    return response;
};
