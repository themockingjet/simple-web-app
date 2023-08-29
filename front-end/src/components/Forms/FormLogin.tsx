//
//
//

import FormInput from "./FormInput";
import { emailValidation } from "../../utils/validateRegister";
import { passwordValidation } from "../../utils/validateLogin";
import { Link } from "react-router-dom";

interface FormLoginProps {
    onSubmit: () => void;
}

const FormLogin = ({ onSubmit }: FormLoginProps) => {
    return (
        <form
            noValidate
            autoComplete="off"
            onSubmit={(e: any) => {
                e.preventDefault();
            }}
        >
            <FormInput
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...emailValidation}
            />
            <FormInput
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...passwordValidation}
            />
            <div className="flex justify-center w-full px-3 mt-2">
                <div className="flex-col justify-center text-center w-full">
                    <button
                        className="bg-blue-500 rounded-full text-white h-10 w-full lg:w-3/4 uppercase font-bold"
                        onClick={onSubmit}
                    >
                        Login
                    </button>
                    <div className="w-full text-center mt-2">
                        <Link to="/register" className="underline">
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormLogin;
