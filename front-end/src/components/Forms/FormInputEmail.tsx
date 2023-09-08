//
//
//

import axios from "../../api/axios";
import Input from "../Input";
import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/utils";
import { useEffect, useState } from "react";

interface FormInputEmailProps {
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

const FormInputEmail = ({
    id,
    name,
    label,
    validation,
    ...props
}: FormInputEmailProps) => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const validateEmail = async () => {
        try {
            const res = await axios.post(`register/check/${watch("email")}`);
            if (res.status === 200) {
                return true;
            }
        } catch (err: any) {
            if (!err.response) {
                alert("No Server Response");
            } else if (err.response.status === 409) {
                return err.response.data.message;
            }
        }
    };

    return (
        <div
            className={cn("flex h-24 w-full flex-col px-2", props.divClassName)}
        >
            <label htmlFor={id} className={cn("w-full", props.labelClassName)}>
                {label}
            </label>
            <Input
                id={id}
                className={cn(
                    "h-8 w-full border border-red-100 px-2 shadow-sm outline-none md:h-10 2xl:h-14",
                    props.inputClassName,
                )}
                type={props.type}
                {...register(name, {
                    ...validation,
                    validate: () => validateEmail(),
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
        </div>
    );
};

export default FormInputEmail;
