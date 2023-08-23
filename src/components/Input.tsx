//
//
//

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }: InputProps, ref) => {
    return (
        <input ref={ref} className={cn("border border-gray-300 rounded-md p-1", className)} autoComplete="off" {...props} />
    );
});

export default Input;
