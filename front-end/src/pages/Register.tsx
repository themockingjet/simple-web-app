//
//
//

import axios from "../api/axios";
import FormRegister from "../components/Forms/FormRegister";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
    const methods = useForm({ mode: "onChange" });
    const [serverResponse, setServerResponse] = useState({ status: "", message: "" });

    const onSubmit = methods.handleSubmit((data) => {
        try {
            axios
                .post("register", JSON.stringify(data), {
                    headers: { "Content-Type": "application/json", withCredentials: true },
                })
                .then((response) => {
                    if (response.status === 200) {
                        methods.reset();
                        setServerResponse({ status: "success", message: response.data.message });
                    }
                });
        } catch (error: any) {
            if (!error.response) {
                setServerResponse({ status: "error", message: "No Server Response" });
            } else if (error.response.status === 409) {
                setServerResponse({ status: "error", message: error.response.data.message });
            } else {
                setServerResponse({ status: "error", message: "Registration failed" });
            }
        }

        setTimeout(() => {
            setServerResponse({ status: "", message: "" });
        }, 3000);
    });

    const handleClick = () => {
        if (serverResponse.status) {
            setServerResponse({ status: "", message: "" });
        } else {
            setServerResponse({ status: "success", message: "aisdjoaisjdoaisjdoa" });
        }
    };

    return (
        <>
            <div className="container mx-auto max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-3.5rem)] h-screen">
                <div className="flex h-full items-center justify-center h-full">
                    <div className="card flex-none w-full lg:max-w-lg drop-shadow-md border border-t-2">
                        <h1 className="text-center font-bold text-blue-500 text-xl py-4">Register</h1>
                        <FormProvider {...methods}>
                            <FormRegister onSubmit={onSubmit} />
                        </FormProvider>
                    </div>
                </div>
            </div>

            {serverResponse.status && (
                <div className="absolute bottom-10 right-10 ">
                    <div
                        className={`w-full h full p-4 rounded-lg ${
                            serverResponse.status === "success" ? "bg-blue-100" : "bg-red-100"
                        }`}
                    >
                        <p
                            className={`text-center font-bold ${
                                serverResponse.status === "success" ? "text-blue-500" : "text-red-500"
                            }`}
                        >
                            {serverResponse.message}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;
