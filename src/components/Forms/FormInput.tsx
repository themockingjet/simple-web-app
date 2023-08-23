//
//
//

import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/utils";
import Input from "../Input";

interface FormInputProps {
    //
    id: string;
    name: string;
    label: string;
    type?: string;
    validation?: {
        required: {
            value: boolean;
            message: string;
        };
        pattern?: {
            value: any;
            message: string;
        };
    };
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    onChange?: (e: any) => void;
}

const FormInput = ({ id, name, label, validation, ...props }: FormInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={cn("flex flex-col px-3 w-full h-24", props.divClassName)}>
            <label htmlFor={id} className={cn("w-full", props.labelClassName)}>
                {label}
            </label>
            <Input
                id={id}
                className={cn(
                    "w-full px-3 shadow-sm border outline-none h-8 md:h-10 2xl:h-14 border border-red-100",
                    props.inputClassName
                )}
                type={props.type}
                {...register(name, validation)}
            />
            {errors[name] && (
                <p
                    className={cn(
                        "text-sm text-red-500 bg-red-100 rounded-md font-bold text-center mt-2",
                        props.errorClassName
                    )}
                >
                    <>{errors[name]?.message}</>
                </p>
            )}
        </div>
    );
};

export default FormInput;
