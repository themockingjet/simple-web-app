//
//
//

import axios from "axios";
import { useState, useEffect } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addHours from "date-fns/addHours";

export function useOccupiedTimes(date: any) {
    const [timeFilter, setTimeFilter] = useState<Date[]>([]);
    const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);

    const fetchReservationsByDate = async () => {
        if (date) {
            await axios
                .get("http://localhost:5000/api/reservations/date/" + date)
                .then((res) => res.data)
                .then((data) => {
                    setOccupiedTimes(data);
                });
        }
    };

    const handleTimeFilter = () => {
        setTimeFilter([]);
        occupiedTimes.map((data: any) => {
            setTimeFilter((timeFilter) => [...timeFilter, setHours(setMinutes(date, 0), data.time)]);
        });
    };

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = date;
        selectedDate.setHours(time.getHours() - 1);

        return currentDate.getTime() < selectedDate.getTime();
    };

    useEffect(() => {
        handleTimeFilter();
    }, [occupiedTimes]);

    useEffect(() => {}, [timeFilter]);

    return { timeFilter, fetchReservationsByDate, filterPassedTime };
}
