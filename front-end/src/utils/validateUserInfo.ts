//
//
//
import {subYears} from "date-fns";

export const birthdateValidation = {
    id: "birthday",
    name: "birthday",
    label: "Birthday:",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
    },
    maxDate: subYears(new Date(), 15),
};
