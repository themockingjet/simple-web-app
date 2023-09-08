//
//
//

import {useFormContext} from "react-hook-form";
import Input from "../Input";

const FormEditAccount = (props: any) => {
    //
    const {data, handleModalClick, onSubmit, isDirty} = props;
    const methods = useFormContext();

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
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        className={`rounded-full pl-1 w-36 border-2 transition duration-200 focus:outline-none hover:cursor-pointer focus:bg-white-300`}
                        defaultValue={data.is_admin}
                        {...methods.register("role", {required: true})}
                    >
                        {data.is_admin === 1 ? (
                            <>
                                <option value="1" className="hidden">
                                    Admin
                                </option>
                                <option value="0">User</option>
                            </>
                        ) : (
                            <>
                                <option value="0" className="hidden">
                                    User
                                </option>
                                <option value="1">Admin</option>
                            </>
                        )}
                    </select>
                </div>
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

export default FormEditAccount;
