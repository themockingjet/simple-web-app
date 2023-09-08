//
//
//

import Input from "../Input";
import FormInputBirthdate from "./FormInputBirthdate";
import FormInput from "./FormInput";
import {birthdateValidation} from "../../utils/validateUserInfo";
import {firstNameValidation, lastNameValidation, contactValidation} from "../../utils/validateRegister";

const FormEditUser = (props: any) => {
    //
    const {data, handleModalClick, onSubmit, isDirty} = props;

    return (
        <form
            className="flex flex-col w-full bg-blue-500 px-2 py-2 rounded-md"
            noValidate
            autoComplete="off"
            onSubmit={(e: any) => {
                e.preventDefault();
            }}
        >
            <span className="text-center text-white text-xl lg:text-2xl">User Details</span>

            <div className="flex flex-col h-full bg-white px-4 py-2 ">
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
                <div className="flex flex-col px-3 w-full h-24">
                    <label htmlFor="email" className="w-full">
                        Email:
                    </label>
                    <Input
                        id="email"
                        className="w-full px-3 shadow-sm border outline-none h-8 md:h-10 2xl:h-14 border border-red-100  disabled:bg-gray-300"
                        value={data.email}
                        readOnly
                        disabled
                    />
                </div>

                <div className="flex flex-col px-3 w-full h-24">
                    <FormInputBirthdate
                        inputClassName="px-2 border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                        {...birthdateValidation}
                    />
                </div>

                <FormInput
                    inputClassName="border-blue-300 focus:border-blue-600 focus:border-4 focus:border-opacity-75 rounded-md"
                    {...contactValidation}
                />

                <div className="flex justify-center space-x-4 w-full py-5">
                    <button
                        type="submit"
                        className="bg-green-300 rounded-md px-4 py-2 hover:bg-green-500 active:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-300"
                        disabled={!isDirty}
                        onClick={onSubmit}
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        className="bg-red-300 rounded-md px-4 py-2 hover:bg-red-500 active:bg-red-500"
                        onClick={handleModalClick}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormEditUser;
