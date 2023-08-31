//
//
//
import {addDays, setHours, setMinutes} from "date-fns";

export const dateValidation = {
    id: "date",
    name: "date",
    label: "Date:",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
    },
    minDate: new Date(),
    maxDate: addDays(new Date(), 60),
};

export const timeValidation = {
    id: "time",
    name: "time",
    label: "Time:",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
    },
    showTimeSelect: true,
    showTimeSelectOnly: true,
    timeIntervals: 60,
    dateFormat: "h:mm aa",
    minTime: setHours(setMinutes(new Date(), 0), 7),
    maxTime: setHours(setMinutes(new Date(), 0), 17),
};
