//
//
//

import DatePicker from "react-datepicker";
import { cn } from "../../utils/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useOccupiedDates } from "../../hooks/useOccupiedDates";
import { useState } from "react";

interface FormInputDateProps {
    //
    id: string;
    name: any;
    label: string;
    validation?: {
        required?: {
            value: boolean;
            message: string;
        };
        validate?: (value: any) => boolean | string;
    };
    date?: Date | undefined;
    selectedDate?: Date | undefined;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    onDateChange?: (e: Date) => void;
}

const FormInputDate = ({ id, name, label, validation, date, selectedDate, ...props }: FormInputDateProps) => {
    //
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const { isLoading, isError, dateFilter } = useOccupiedDates();

    return (
        <div className={cn("flex flex-col w-full ", props.divClassName)}>
            <label htmlFor={id} className={cn("w-full text-base", props.labelClassName)}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                defaultValue={selectedDate}
                rules={validation}
                render={({ field }) => (
                    <DatePicker
                        id={id}
                        className={cn("border border-gray-300 rounded-md p-1 focus:outline-none", props.inputClassName)}
                        onChange={(e: Date) => {
                            field.onChange(e);
                            props.onDateChange && props.onDateChange(e);
                        }}
                        selected={field.value}
                        disabledKeyboardNavigation
                        isClearable
                        excludeDates={dateFilter}
                        {...props}
                    />
                )}
            />
            {errors[name] && (
                <p className="text-sm text-red-500 bg-red-100 rounded-md font-bold text-center mt-2">
                    <>{errors[name] ? errors[name]?.message : ""}</>
                </p>
            )}
        </div>
    );
};

export default FormInputDate;
