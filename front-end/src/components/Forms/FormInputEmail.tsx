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

const FormInputEmail = ({ id, name, label, validation, ...props }: FormInputEmailProps) => {
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
                {...register(name, {
                    ...validation,
                    validate: () => validateEmail(),
                })}
            />
            {errors[name] && (
                <p
                    className={cn(
                        "text-sm text-red-500 bg-red-100 rounded-md tracking-tighter text-center mt-1",
                        props.errorClassName
                    )}
                >
                    <>{errors[name]?.message}</>
                </p>
            )}
        </div>
    );
};

export default FormInputEmail;
