//
//
//

import FormSchedule from "../../components/Forms/FormSchedule";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import Card from "../../components/Card";

const UserSchedule = () => {
    //
    const axiosPrivate = useAxiosPrivate();
    const { cookies } = useAuth();

    const [errorMessage, setErrorMessage] = useState({ status: "", message: "" });

    const methods = useForm({
        mode: "onChange",
    });

    const onSubmit = methods.handleSubmit(async (data: any) => {
        //
        data.id = cookies.id;

        try {
            const response = await axiosPrivate.post("/api/reservation", data);
            if (response) {
                methods.reset();
                setErrorMessage({
                    status: "success",
                    message: "Success! You may now view your reservation schedule in your dashboard.",
                });
            }
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage({ status: "error", message: "No Server Response." });
            } else {
                setErrorMessage({ status: "error", message: "Internal Server Error." });
            }
        }

        setTimeout(() => {
            setErrorMessage({ status: "", message: "" });
        }, 3000);
    });

    return (
        <>
            <div className="grid w-full auto-rows-min grid-cols-4 gap-4">
                <div className="col-span-4 h-full w-full lg:col-span-2">
                    <Card className="h-68 w-full border border-slate-200">
                        <FormProvider {...methods}>
                            <FormSchedule onSubmit={onSubmit} />
                        </FormProvider>
                        {errorMessage.message && (
                            <div
                                className={`container mx-auto flex justify-center rounded-md border bg-opacity-75 py-2 ${
                                    errorMessage.status === "success"
                                        ? "border-green-500 bg-green-300 text-green-800"
                                        : "border-red-500 bg-red-300 text-red-800"
                                }`}
                            >
                                <span className="px-4 text-center font-semibold">{errorMessage.message}</span>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default UserSchedule;
