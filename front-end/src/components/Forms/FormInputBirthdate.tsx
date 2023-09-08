//
//
//

import DatePicker from "react-datepicker";
import {cn} from "../../utils/utils";
import {Controller, useFormContext} from "react-hook-form";

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
    divClassName?: string;
    selectedDate?: Date;
    labelClassName?: string;
    inputClassName?: string;
    onDateChange?: (e: Date) => void;
}

const FormInputBirthdate = ({id, name, label, validation, selectedDate, ...props}: FormInputDateProps) => {
    const {
        control,
        formState: {errors},
    } = useFormContext();

    return (
        <div className={cn("flex flex-col w-full ", props.divClassName)}>
            <label htmlFor={id} className={cn("w-full text-base", props.labelClassName)}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({field}) => (
                    <DatePicker
                        id={id}
                        className={cn("border border-gray-300 rounded-md p-1 focus:outline-none", props.inputClassName)}
                        onChange={(e: Date) => field.onChange(e)}
                        selected={field.value}
                        disabledKeyboardNavigation
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={60}
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

export default FormInputBirthdate;
