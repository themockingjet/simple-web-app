//
//
//

import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import { setHours, setMinutes, addHours } from "date-fns";
import { useQueryReservations } from "./useQuery/useQueryReservations";

export function useOccupiedDates() {
    //
    const minDate = new Date();
    const maxDate = addDays(minDate, 60);

    const start = `${minDate.getFullYear()}-${minDate.getMonth() + 1}-${minDate.getDate()}`;
    const end = `${maxDate.getFullYear()}-${maxDate.getMonth() + 2}-${maxDate.getDate()}`;

    const { queryReservationsByRange } = useQueryReservations();
    const { isLoading, isError, data } = queryReservationsByRange(start, end);

    const [occupiedDates, setOccupiedDates] = useState<Date[]>(data);
    const [dateFilter, setDateFilter] = useState<Date[]>([]);

    const handleDateFilter = () => {
        //
        // Set Max Available Time
        const maxTimeToday = setHours(setMinutes(new Date(), 0), 17);
        const minTimeToday = addHours(new Date(), 2);

        const dateToday = new Date(`${maxTimeToday.getFullYear()}-${maxTimeToday.getMonth() + 1}-${maxTimeToday.getDate()}`);
        // exclude occupied dates
        if (occupiedDates) {
            Object.keys(occupiedDates).forEach((key) => {
                //
                if ((occupiedDates as any)[key].length == 11) {
                    //
                    const exists = dateFilter.find((item) => {
                        return item.getTime() === new Date(key).getTime();
                    });
                    // don't add if existing
                    setDateFilter((oldFilter) => {
                        return exists ? oldFilter : [...oldFilter, new Date(key)];
                    });
                }
            });
        }

        // exclude date today if passed max time
        if (minDate > maxTimeToday || minTimeToday > maxTimeToday) {
            //
            const exists = dateFilter.find((item) => {
                return item.getTime() === dateToday.getTime();
            });
            // don't add if existing
            setDateFilter((oldFilter) => {
                return exists ? oldFilter : [...oldFilter, dateToday];
            });
        }
    };

    useEffect(() => {
        setOccupiedDates(data);
    }, [data]);

    useEffect(() => {
        handleDateFilter();
    }, [occupiedDates]);

    return { isLoading, isError, dateFilter, occupiedDates };
}
