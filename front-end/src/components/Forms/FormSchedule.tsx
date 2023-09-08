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
                className={cn("flex h-full w-full flex-col space-y-4 p-4", props.formClassName)}
                noValidate
                autoComplete="off"
                onSubmit={(e: any) => {
                    e.preventDefault();
                }}
            >
                <div className="flex flex-col space-x-0 lg:flex-row lg:space-x-4">
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
                            inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md disabled:bg-slate-300"
                            date={date}
                            {...timeValidation}
                        />
                    </QueryClientProvider>
                </div>

                <div className="flex w-full justify-center">
                    <button
                        className=" h-10 w-3/4 rounded-full bg-blue-500 font-bold uppercase text-white md:w-1/2"
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
