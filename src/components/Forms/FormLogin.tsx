//
//
//

import FormInput from "./FormInput";
import { usernameValidation, passwordValidation } from "../../utils/auth";

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
                {...usernameValidation}
            />
            <FormInput
                inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                {...passwordValidation}
            />
            <p className="text-center py-2">Admin / Admin</p>
            <p className="text-center py-2">Guest / Guest</p>
            <div className="flex w-full p-4 px-3 ">
                <button className="bg-blue-500 rounded-full text-white h-10 w-full uppercase font-bold" onClick={onSubmit}>
                    Login
                </button>
            </div>
        </form>
    );
};

export default FormLogin;
