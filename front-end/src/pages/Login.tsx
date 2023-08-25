//
//
//

import { FormProvider, useForm } from "react-hook-form";
import axios from "../api/axios";
import FormLogin from "../components/Forms/FormLogin";
import { useState } from "react";

const Login = () => {
    //
    const [serverResponse, setServerResponse] = useState({ status: "", message: "" });
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => {
        try {
            axios
                .post("/auth/login", data)
                .then((response) => {
                    setServerResponse({ status: "", message: "" });
                    if (response.status === 200) {
                        window.location.href = "/admin/dashboard";
                    }
                })
                .catch((error) => {
                    setServerResponse({ status: "error", message: error.response.data.message });
                });
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            <div className="container mx-auto max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-3.5rem)] h-screen">
                <div className="flex h-full items-center justify-center h-full">
                    <div className="card flex-none w-full lg:max-w-lg drop-shadow-md border border-t-2">
                        <h1 className="text-center font-bold text-blue-500 text-xl py-4">Log in</h1>
                        {serverResponse.status && (
                            <div className="flex flex-col items-center p-2">
                                <div className="w-full h-full bg-red-100 border border-red-300">
                                    <p className="p-4">{serverResponse.message}</p>
                                </div>
                            </div>
                        )}
                        <FormProvider {...methods}>
                            <FormLogin onSubmit={onSubmit} />
                        </FormProvider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
