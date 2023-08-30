//
//
//

import axios from "axios";
import { useState, useEffect } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addHours from "date-fns/addHours";
import { useQueryReservations } from "./useQuery/useQueryReservations";

export function useOccupiedTimes(date: Date | null) {
    const [timeFilter, setTimeFilter] = useState<Date[]>([]);

    const { queryReservationByDate } = useQueryReservations();
    const { isLoading, isError, data } = queryReservationByDate(date);

    const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);

    const handleTimeFilter = () => {
        //
        setTimeFilter([]);

        console.log("occupied", occupiedTimes);
        if (date) {
            if (occupiedTimes.length > 0) {
                occupiedTimes.map((data: any) => {
                    setTimeFilter((timeFilter) => [...timeFilter, setHours(setMinutes(date, 0), data.time)]);
                });
            }
        }
    };

    const filterPassedTime = (time: Date) => {
        //
        const currentDate = new Date();
        const selectedDate = date;

        if (selectedDate) {
            //
            selectedDate.setHours(time.getHours() - 1);
            return currentDate.getTime() < selectedDate.getTime();
        }
        return false;
    };

    useEffect(() => {
        //
        if (data) {
            setOccupiedTimes(data);
        }
    }, [date, data]);

    useEffect(() => {
        //
        if (occupiedTimes.length > 0) {
            handleTimeFilter();
        }
    }, [occupiedTimes]);

    return { isLoading, isError, timeFilter, filterPassedTime };
}
