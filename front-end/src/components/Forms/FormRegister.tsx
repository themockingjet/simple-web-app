//
//
//

import FormInput from "./FormInput";
import FormInputEmail from "./FormInputEmail";
import { Link } from "react-router-dom";
import {
    firstNameValidation,
    lastNameValidation,
    contactValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
} from "../../utils/validateRegister";

interface FormRegisterProps {
    onSubmit: () => void;
}

const FormRegister = ({ onSubmit }: FormRegisterProps) => {
    return (
        <form
            noValidate
            autoComplete="off"
            onSubmit={(e: any) => {
                e.preventDefault();
            }}
        >
            <div className="flex flex-col md:flex-row">
                <FormInput
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...firstNameValidation}
                />
                <FormInput
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...lastNameValidation}
                />
            </div>
            <FormInput
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...contactValidation}
            />
            <FormInputEmail
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...emailValidation}
            />
            <FormInput
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...passwordValidation}
            />
            <FormInput
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...confirmPasswordValidation}
            />

            <div className="mt-2 flex w-full justify-center px-3 ">
                <div className="w-full flex-col justify-center text-center">
                    <button
                        className="h-10 w-full rounded-full bg-blue-500 font-bold uppercase text-white lg:w-3/4"
                        onClick={onSubmit}
                    >
                        Register
                    </button>
                    <div className="mt-2 w-full text-center">
                        <Link to="/login" className="underline">
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormRegister;
