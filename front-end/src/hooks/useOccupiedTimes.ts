//
//
//

import {useState, useEffect} from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {useQueryReservations} from "./useQuery/useQueryReservations";

export function useOccupiedTimes(date: any) {
    const [timeFilter, setTimeFilter] = useState<Date[]>([]);

    const {queryReservationByDate} = useQueryReservations();
    const {isLoading, isError, data} = queryReservationByDate(date);

    const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);

    const handleTimeFilter = () => {
        //
        setTimeFilter([]);

        occupiedTimes?.map((data: any) => {
            setTimeFilter((timeFilter) => [...timeFilter, setHours(setMinutes(date, 0), data.time)]);
        });
    };

    const filterPassedTime = (time: Date) => {
        //
        const currentDate = new Date();
        const selectedDate = date;

        //
        selectedDate.setHours(time.getHours() - 1);
        return currentDate.getTime() < selectedDate.getTime();
    };

    useEffect(() => {
        //
        setOccupiedTimes(data);
    }, [date, data]);

    useEffect(() => {
        //

        handleTimeFilter();
    }, [occupiedTimes]);

    return {isLoading, isError, timeFilter, filterPassedTime};
}
