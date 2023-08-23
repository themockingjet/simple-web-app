//
//
//
import { addDays, setHours, setMinutes } from "date-fns";

export const firstNameValidation = {
    id: "first_name",
    name: "first_name",
    label: "First Name:",
    type: "text",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        pattern: {
            value: /^([a-zA-Z0-9]+)$/,
            message: "Invalid input",
        },
        minLength: {
            value: 3,
            message: "Must be 3 at least characters long",
        },
        maxLength: {
            value: 30,
            message: "30 characters max",
        },
    },
};

export const lastNameValidation = {
    id: "last_name",
    name: "last_name",
    label: "Last Name:",
    type: "text",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        pattern: {
            value: /^([a-zA-Z0-9]+)$/,
            message: "Invalid input",
        },
        minLength: {
            value: 3,
            message: "Must be 3 at least characters long",
        },
        maxLength: {
            value: 30,
            message: "30 characters max",
        },
    },
};

export const emailValidation = {
    id: "email",
    name: "email",
    label: "Email Address:",
    type: "email",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email address",
        },
    },
};

export const contactValidation = {
    id: "contact_no",
    name: "contact_no",
    label: "Contact Number:",
    type: "phone",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        pattern: {
            value: /^([09][0-9]{10})$/,
            message: "Invalid contact number",
        },
    },
};

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
