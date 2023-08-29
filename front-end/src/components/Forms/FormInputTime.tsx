//
//
//
import DatePicker from "react-datepicker";
import { cn } from "../../utils/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useOccupiedTimes } from "../../hooks/useOccupiedTimes";

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
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    onDateChange?: (e: any) => void;
}

const FormInputTime = ({ id, name, label, validation, ...props }: FormInputTimeProps) => {
    //
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const date = props.date;

    const { timeFilter, filterPassedTime } = useOccupiedTimes(date);

    return (
        <div className={cn("flex flex-col w-full w-full px-3 h-24", props.divClassName)}>
            <label htmlFor={id} className={cn("w-full text-base", props.labelClassName)}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <DatePicker
                        id={id}
                        className={cn(
                            "w-full px-3 py-2 shadow-sm border focus:outline-none h-8 md:h-10 2xl:h-14 disabled:bg-gray-200",
                            props.inputClassName
                        )}
                        onChange={(e: Date) => {
                            field.onChange(e);
                            props.onDateChange && props.onDateChange(e);
                        }}
                        selected={field.value}
                        disabled={!date}
                        disabledKeyboardNavigation
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
