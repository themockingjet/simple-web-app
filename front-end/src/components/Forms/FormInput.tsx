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
        required?: {
            value: boolean;
            message: string;
        };
        pattern?: {
            value: any;
            message: string;
        };
    };
    pass?: string;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    onChange?: (e: any) => void;
}

const FormInput = ({
    id,
    name,
    label,
    validation,
    ...props
}: FormInputProps) => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    return (
        <div
            className={cn("flex h-24 w-full flex-col px-2", props.divClassName)}
        >
            <label htmlFor={id} className={cn("w-full", props.labelClassName)}>
                {label}
            </label>
            {name === "confirm_password" ? (
                <>
                    <Input
                        id={id}
                        className={cn(
                            "h-8 w-full border border-blue-300 px-2 shadow-sm outline-none md:h-10 2xl:h-14",
                            props.inputClassName,
                        )}
                        type={props.type}
                        {...register(name, {
                            required: { value: true, message: "Required" },
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                    />
                    {errors[name] && (
                        <p
                            className={cn(
                                "mt-1 rounded-md bg-red-300 bg-opacity-75 text-center text-sm tracking-tighter text-red-800",
                                props.errorClassName,
                            )}
                        >
                            <>{errors[name]?.message}</>
                        </p>
                    )}
                </>
            ) : (
                <>
                    <Input
                        id={id}
                        className={cn(
                            "h-8 w-full border border-red-100 px-2 shadow-sm outline-none md:h-10 2xl:h-14",
                            props.inputClassName,
                        )}
                        type={props.type}
                        {...register(name, validation)}
                    />
                    {errors[name] && (
                        <p
                            className={cn(
                                "mt-1 rounded-md bg-red-300 bg-opacity-75 text-center text-sm tracking-tighter text-red-800",
                                props.errorClassName,
                            )}
                        >
                            <>{errors[name]?.message}</>
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default FormInput;
