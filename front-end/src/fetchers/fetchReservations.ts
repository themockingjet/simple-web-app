//
//
//

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function fetchReservations() {
    //
    const axiosPrivate = useAxiosPrivate();

    const getReservations = async () => {
        //
        const response = await axiosPrivate.get("/api/reservation").then((res) => res.data);
        return response;
    };

    const getReservationByDate = async (date: Date | null) => {
        //
        const response = await axiosPrivate.get("/api/reservation/date/" + date).then((res) => res.data);
        return response;
    };

    const getReservationsByRange = async (start: string, end: string) => {
        //
        const response = await axiosPrivate.get("/api/reservation/range/" + start + "/" + end).then((res) => res.data);
        return response;
    };

    return { getReservations, getReservationByDate, getReservationsByRange };
}
