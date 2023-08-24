//
//
//

import FormInputDate from "./FormInputDate";
import FormInput from "./FormInput";
import { cn } from "../../utils/utils";
import {
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    contactValidation,
    dateValidation,
    timeValidation,
} from "../../utils/validateReservation";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/datepicker.css";

interface FormLoginProps {
    formClassName?: string;
    onSubmit: () => void;
}

const FormReservation = ({ onSubmit, ...props }: FormLoginProps) => {
    return (
        <>
            <form
                className={cn(
                    "w-full md:w-3/4 lg:w-full justify-center 2xl:h-3/4 my-auto p-2 md:p-3 lg:px-6 2xl:px-24 ",
                    props.formClassName
                )}
                noValidate
                autoComplete="off"
                onSubmit={(e: any) => {
                    e.preventDefault();
                }}
            >
                <div className="flex">
                    <FormInput
                        inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                        {...firstNameValidation}
                    />
                    <FormInput
                        inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                        {...lastNameValidation}
                    />
                </div>

                <FormInput
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...emailValidation}
                />
                <FormInput
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...contactValidation}
                />
                <FormInputDate
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...dateValidation}
                />
                <FormInputDate
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...timeValidation}
                />

                <div className="flex w-full px-3 ">
                    <button
                        className="bg-blue-500 rounded-full text-white h-10 w-full uppercase font-bold"
                        onClick={onSubmit}
                    >
                        Book Reservation
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormReservation;
