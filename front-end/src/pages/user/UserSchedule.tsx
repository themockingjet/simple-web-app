//
//
//
"client";

import FormSchedule from "../../components/Forms/FormSchedule";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const UserSchedule = () => {
    //
    const axiosPrivate = useAxiosPrivate();
    const { cookies } = useAuth();

    const [errorMessage, setErrorMessage] = useState({ status: "", message: "" });

    const methods = useForm({
        mode: "onChange",
    });

    const onSubmit = methods.handleSubmit(async (data) => {
        //
        data.id = cookies.id;
        console.log(data);

        // try {
        //     const response = await axiosPrivate.post("/api/reservation", data);
        //     if (response) {
        //         methods.reset();
        //         setErrorMessage({
        //             status: "success",
        //             message: "Success! You may now view your reservation schedule in your dashboard.",
        //         });
        //     }
        // } catch (error: any) {
        //     if (!error.response) {
        //         setErrorMessage({ status: "error", message: "No Server Response." });
        //     } else {
        //         setErrorMessage({ status: "error", message: "Internal Server Error." });
        //     }
        // }

        // setTimeout(() => {
        //     setErrorMessage({ status: "", message: "" });
        // }, 3000);
    });

    return (
        <>
            <div className="flex flex-col w-full h-full space-y-2">
                <div className="z-10 card w-full h-full border border-gray-200 drop-shadow-sm">
                    <div className="grid grid-flow-row gap-4">
                        <div className="container mx-auto">
                            <FormProvider {...methods}>
                                <FormSchedule onSubmit={onSubmit} />
                            </FormProvider>
                        </div>
                    </div>
                </div>

                {errorMessage.message && (
                    <div className="z-0 card h-full border border-gray-200 drop-shadow-sm w-1/2 flex self-center">
                        <div
                            className={`container mx-auto flex justify-center border py-2 rounded-md ${
                                errorMessage.status === "success"
                                    ? "border-green-300 bg-green-100"
                                    : "border-red-300 bg-red-100"
                            }`}
                        >
                            <span className="font-semibold text-center px-4">{errorMessage.message}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserSchedule;
