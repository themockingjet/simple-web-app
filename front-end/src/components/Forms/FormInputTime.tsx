//
//
//
import DatePicker from "react-datepicker";
import {cn} from "../../utils/utils";
import {Controller, useFormContext} from "react-hook-form";
import {useOccupiedTimes} from "../../hooks/useOccupiedTimes";
import {useEffect, useState} from "react";

interface FormInputTimeProps {
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
    date: Date | null;
    selectedTime: Date | null;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    onDateChange?: (e: any) => void;
}

const FormInputTime = ({id, name, label, validation, selectedTime, ...props}: FormInputTimeProps) => {
    //
    const {
        control,
        formState: {errors},
    } = useFormContext();

    const date = props.date;
    const {timeFilter, filterPassedTime} = useOccupiedTimes(date);
    const [time, setTime] = useState<any>();

    useEffect(() => {}, [date, timeFilter]);

    return (
        <div className={cn("flex flex-col w-full", props.divClassName)}>
            <label htmlFor={id} className={cn("w-full text-base", props.labelClassName)}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                defaultValue={selectedTime}
                rules={validation}
                render={({field}) => (
                    <DatePicker
                        id={id}
                        className={cn("border border-gray-300 rounded-md p-1 focus:outline-none", props.inputClassName)}
                        onChange={(e: Date) => {
                            field.onChange(e);
                        }}
                        selected={field.value}
                        disabled={!date}
                        disabledKeyboardNavigation
                        isClearable
                        includeDates={[date ? date : new Date()]}
                        excludeTimes={timeFilter}
                        filterTime={filterPassedTime}
                        minDate={date}
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

export default FormInputTime;
