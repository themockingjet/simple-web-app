//
//
//

import axios from "../api/axios";
import FormLogin from "../components/Forms/FormLogin";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/Card";

const Login = () => {
    //
    const [serverResponse, setServerResponse] = useState({
        status: "",
        message: "",
    });

    const { login } = useAuth();
    const methods = useForm();

    const onSubmit = methods.handleSubmit(async (data) => {
        try {
            const response = await axios.post("/auth/login", data, {
                withCredentials: true,
            });

            if (response) {
                setServerResponse({ status: "", message: "" });
                login(response.data);
            }
        } catch (error: any) {
            if (!error.response) {
                setServerResponse({
                    status: "error",
                    message: "No Server Response",
                });
            } else if (error.response?.status === 401) {
                setServerResponse({
                    status: "error",
                    message: "Incorrent email or password.",
                });
            } else {
                setServerResponse({
                    status: "error",
                    message: "Login failed.",
                });
            }
        }
    });

    return (
        <div className="flex h-full w-full items-center justify-center xl:h-screen">
            <Card className="w-full border border-slate-200 lg:max-w-lg">
                <h1 className="py-4 text-center text-xl font-bold text-blue-500">
                    Log in
                </h1>
                {serverResponse.status && (
                    <div className="flex flex-col items-center p-2">
                        <div className="h-full w-full border border-red-300 bg-red-100">
                            <p className="p-4">{serverResponse.message}</p>
                        </div>
                    </div>
                )}
                <FormProvider {...methods}>
                    <FormLogin onSubmit={onSubmit} />
                </FormProvider>
            </Card>
        </div>
    );
};

export default Login;
