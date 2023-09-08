//
//
//

import FormInputDate from "./FormInputDate";
import FormInputTime from "./FormInputTime";
import Input from "../Input";
import {useState} from "react";
import {dateValidation, timeValidation} from "../../utils/validateReservation";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/datepicker.css";

import {useFormContext} from "react-hook-form";
import {setHours} from "date-fns";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();

const FormEditReservation = (props: any) => {
    //
    const {data, handleModalClick, onSubmit, isDirty} = props;
    const methods = useFormContext();

    const [date, setDate] = useState<any>(new Date(data.date));

    return (
        <>
            <form
                className="flex flex-col w-full bg-blue-500 px-2 py-2 rounded-md"
                noValidate
                autoComplete="off"
                onSubmit={(e: any) => {
                    e.preventDefault();
                }}
            >
                <span className="text-center text-white text-xl lg:text-2xl">Reservation Details</span>

                <div className="flex flex-col h-full bg-white px-4 py-2 space-y-2">
                    <div className="flex flex-col lg:flex-row w-full lg:space-x-4 space-y-2 lg:space-y-0">
                        <div className="flex flex-col w-full">
                            <label htmlFor="first_name">First Name:</label>
                            <Input
                                id="first_name"
                                className="px-2 border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                                value={data.first_name}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="last_name">Last Name:</label>
                            <Input
                                id="last_name"
                                className="px-2 border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                                value={data.last_name}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <label htmlFor="email">Email: </label>
                    <Input
                        id="email"
                        className="px-2 border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                        value={data.email}
                        readOnly
                        disabled
                    />
                    <label htmlFor="contact">Contact:</label>
                    <Input
                        id="contact"
                        className="px-2 border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                        value={data.contact_no}
                        readOnly
                        disabled
                    />
                    <div className="flex flex-col lg:flex-row w-full lg:space-x-4 space-y-2 lg:space-y-0">
                        <QueryClientProvider client={queryClient}>
                            <FormInputDate
                                inputClassName="px-2 border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                                {...dateValidation}
                                selectedDate={date}
                                onDateChange={(e: Date) => {
                                    setDate(e);
                                    methods.resetField("time", {
                                        defaultValue: null,
                                    });
                                }}
                            />
                            <FormInputTime
                                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                                date={date}
                                selectedTime={setHours(new Date(data.date), parseInt(data.time))}
                                {...timeValidation}
                            />
                        </QueryClientProvider>
                    </div>
                    {data.status !== "CANCELLED" && data.status !== "COMPLETED" && (
                        <>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                className={`rounded-full pl-1 w-36 border-2 transition duration-200 focus:outline-none hover:cursor-pointer focus:bg-white-300`}
                                defaultValue={data.status}
                                {...methods.register("status", {required: true})}
                            >
                                {data.status === "PENDING" && (
                                    <>
                                        <option value="PENDING" className="hidden">
                                            PENDING
                                        </option>
                                        <option value="CANCELLED">CANCELLED</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                    </>
                                )}
                                {data.status === "CONFIRMED" && (
                                    <>
                                        <option value="CONFIRMED" className="hidden">
                                            CONFIRMED
                                        </option>
                                        <option value="CANCELLED">CANCELLED</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </>
                                )}
                            </select>
                        </>
                    )}
                    <div className="flex justify-center space-x-4 w-full py-5">
                        <button
                            type="submit"
                            className="bg-green-300 rounded-md px-4 py-2 hover:bg-green-500 active:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-300"
                            disabled={!isDirty}
                            onClick={onSubmit}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="bg-red-300 rounded-md px-4 py-2 hover:bg-red-500 active:bg-red-500"
                            onClick={handleModalClick}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormEditReservation;
