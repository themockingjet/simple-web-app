//
//
//

import { useQuery } from "@tanstack/react-query";
import { fetchReservations } from "../fetchers/fetchReservations";

export function useQueryReservations() {
    const { getReservations, getReservationByDate, getReservationsByRange } = fetchReservations();

    const queryReservations = (ITEMS_PER_PAGE: number) => {
        //
        const { isError, isLoading, data } = useQuery(["reservations"], getReservations, {
            staleTime: 600000,
            retry: 2,
            onSuccess: (data: any) => {
                return data.slice(0, ITEMS_PER_PAGE);
            },
        });

        return {
            isLoading,
            isError,
            data,
        };
    };

    const queryReservationByDate = (date: Date | null) => {
        //
        const { isError, isLoading, data } = useQuery(["reservation_by_date", date], () => getReservationByDate(date), {
            staleTime: 600000,
            retry: 3,
            retryDelay: 5000,
            enabled: !!date,
        });

        return {
            isLoading,
            isError,
            data,
        };
    };

    const queryReservationsByRange = (start: string, end: string) => {
        //
        const { isError, isLoading, data } = useQuery(
            ["reservations_range", start, end],
            () => getReservationsByRange(start, end),
            {
                staleTime: 600000,
                retryDelay: 5000,
            }
        );

        return {
            isLoading,
            isError,
            data,
        };
    };

    return { queryReservations, queryReservationByDate, queryReservationsByRange };
}
