//
//
//

import axios from "../api/axios";
import FormLogin from "../components/Forms/FormLogin";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    //
    const [serverResponse, setServerResponse] = useState({ status: "", message: "" });
    const { login } = useAuth();

    const methods = useForm();

    const onSubmit = methods.handleSubmit(async (data) => {
        try {
            const response = await axios.post("/auth/login", data, { withCredentials: true });

            if (response) {
                setServerResponse({ status: "", message: "" });
                login(response.data);
            }
        } catch (error: any) {
            if (!error.response) {
                setServerResponse({ status: "error", message: "No Server Response" });
            } else if (error.response?.status === 401) {
                setServerResponse({ status: "error", message: "Incorrent email or password." });
            } else {
                setServerResponse({ status: "error", message: "Login failed." });
            }
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
