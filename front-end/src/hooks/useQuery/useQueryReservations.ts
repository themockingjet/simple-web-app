//
//
//

import {useQuery} from "@tanstack/react-query";
import {fetchReservations} from "../../fetchers/fetchReservations";
import {useState} from "react";

export function useQueryReservations() {
    //
    const {findTableReservations, findAllReservations, findReservationByDate, findReservationsByRange} = fetchReservations();

    const queryTableReservations = (ITEMS_PER_PAGE: number, search: string | undefined) => {
        //
        const [result, setResult] = useState([]);
        const {isError, isLoading, data, refetch} = useQuery(
            ["reservations_dt", search],
            () => findTableReservations(search),
            {
                cacheTime: 300000,
                staleTime: 2000,
                retry: 10,
                onSuccess: (data: any) => {
                    setResult(data.slice(0, ITEMS_PER_PAGE));
                },
            }
        );

        return {isLoading, isError, data, result, setResult, refetch};
    };

    const queryReservations = (ITEMS_PER_PAGE: number) => {
        //
        const [result, setResult] = useState([]);
        const {isError, isLoading, data} = useQuery(["reservations"], findAllReservations, {
            cacheTime: 300000,
            staleTime: 2000,
            retry: 3,
            onSuccess: (data: any) => {
                setResult(data.slice(0, ITEMS_PER_PAGE));
            },
        });

        return {isLoading, isError, data, result, setResult};
    };

    const queryReservationByDate = (date: Date | null) => {
        //
        const {isError, isLoading, data} = useQuery(["reservations", date], () => findReservationByDate(date), {
            cacheTime: 300000,
            staleTime: 2000,
            retry: 3,
            enabled: !!date,
        });

        return {isLoading, isError, data};
    };

    const queryReservationsByRange = (start: string, end: string) => {
        //
        const {isError, isLoading, data} = useQuery(
            ["reservations_range", start, end],
            () => findReservationsByRange(start, end),
            {
                cacheTime: 300000,
                staleTime: 2000,
                retry: 3,
            }
        );

        return {
            isLoading,
            isError,
            data,
        };
    };

    return {queryTableReservations, queryReservations, queryReservationByDate, queryReservationsByRange};
}
