//
//
//

import axios from "../api/axios";

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

export const emailValidation = {
    id: "email",
    name: "email",
    label: "Email:",
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

export const passwordValidation = {
    id: "password",
    name: "password",
    label: "Password:",
    type: "password",
    value: "",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        minLength: {
            value: 8,
            message: "Must be at least 8 characters",
        },
    },
};

export const confirmPasswordValidation = {
    id: "confirm_password",
    name: "confirm_password",
    label: "Confirm Password:",
    type: "password",
};
