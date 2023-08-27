import axios from "axios";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export function useOccupiedDates() {
    const minDate = new Date();
    const maxDate = addDays(minDate, 60);
    const [occupiedDates, setOccupiedDates] = useState<Date[]>([]);
    const [dateFilter, setDateFilter] = useState<Date[]>([]);

    const fetchReservations = async () => {
        let defMinDate = minDate;
        let defMaxDate = maxDate;

        const response = await axios.get("http://localhost:5000/api/reservations/from/" + defMinDate + "/to/" + defMaxDate);
        const json = await response.data;

        if (response.status == 200) {
            setOccupiedDates(json);
        }
    };

    const handleDateFilter = () => {
        const maxTimeToday = setHours(setMinutes(new Date(), 0), 17);
        if (occupiedDates) {
            Object.keys(occupiedDates).forEach((key) => {
                if ((occupiedDates as any)[key].length == 11) {
                    setDateFilter((dateFilter) => [...dateFilter, new Date(key)]);
                }
            });
        }
        if (minDate > maxTimeToday) {
            setDateFilter((oldFilter) => [...oldFilter, new Date()]);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        handleDateFilter();
    }, [occupiedDates]);

    return { dateFilter, occupiedDates };
}
