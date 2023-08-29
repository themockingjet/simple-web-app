//
//
//

import FormInputDate from "./FormInputDate";
import FormInputTime from "./FormInputTime";
import { cn } from "../../utils/utils";
import { useState } from "react";
import { dateValidation, timeValidation } from "../../utils/validateReservation";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/datepicker.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
const queryClient = new QueryClient();

interface FormLoginProps {
    formClassName?: string;
    onSubmit: () => void;
}

const FormReservation = ({ onSubmit, ...props }: FormLoginProps) => {
    //
    const [date, setDate] = useState<Date | null>(null);

    const methods = useFormContext();

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
                    <QueryClientProvider client={queryClient}>
                        <FormInputDate
                            inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                            {...dateValidation}
                            onDateChange={(e: Date) => {
                                setDate(e);
                                methods.resetField("time");
                            }}
                        />
                        <FormInputTime
                            inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                            date={date}
                            {...timeValidation}
                        />
                    </QueryClientProvider>
                </div>

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
