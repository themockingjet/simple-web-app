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
            <div className="flex flex-row">
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

            <div className="flex justify-center w-full px-3 mt-2 ">
                <div className="flex-col justify-center text-center w-full">
                    <button
                        className="bg-blue-500 rounded-full text-white h-10 w-full lg:w-3/4 uppercase font-bold"
                        onClick={onSubmit}
                    >
                        Register
                    </button>
                    <div className="w-full text-center mt-2">
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
