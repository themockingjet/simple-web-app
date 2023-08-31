//
//
//

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function fetchReservations() {
    //
    const axiosPrivate = useAxiosPrivate();

    const findTableReservations = async (search: string | undefined) => {
        //
        if (search === undefined) {
            search = "";
        }
        const response = await axiosPrivate.get("/api/table/reservations?search=" + search).then((res) => res.data);
        return response;
    };

    const findAllReservations = async () => {
        //
        const response = await axiosPrivate.get("/api/reservation").then((res) => res.data);
        return response;
    };

    const findReservationByDate = async (date: Date | null) => {
        //
        const response = await axiosPrivate.get("/api/reservation/date/" + date).then((res) => res.data);
        return response;
    };

    const findReservationsByRange = async (start: string, end: string) => {
        //
        const response = await axiosPrivate.get("/api/reservation/range/" + start + "/" + end).then((res) => res.data);
        return response;
    };

    return {findTableReservations, findAllReservations, findReservationByDate, findReservationsByRange};
}
