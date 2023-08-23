//
//
//

import DatePicker from "react-datepicker";
import { cn } from "../../utils/utils";
import { Controller, useFormContext } from "react-hook-form";

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
    date?: Date | null;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    onDateChange?: (e: any) => void;
}

const FormInputDate = ({ id, name, label, validation, ...props }: FormInputDateProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
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
                            className={cn(
                                "w-full px-3 py-2 shadow-sm border focus:outline-none h-8 md:h-10 2xl:h-14 disabled:bg-gray-200",
                                props.inputClassName
                            )}
                            onChange={(e: Date) => {
                                field.onChange(e);
                                props.onDateChange && props.onDateChange(e);
                            }}
                            selected={field.value}
                            disabledKeyboardNavigation
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
        </>
    );
};

export default FormInputDate;
