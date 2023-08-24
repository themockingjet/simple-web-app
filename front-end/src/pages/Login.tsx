//
//
//

import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import FormLogin from "../components/Forms/FormLogin";

const Login = () => {
    //
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => {
        axios.post("http://localhost:5000/auth/login", data).then((response) => {
            console.log(response);
            window.location.href = "/";
        });
    });

    return (
        <>
            <div className="container mx-auto max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-3.5rem)] h-screen">
                <div className="flex h-full items-center justify-center h-full">
                    <div className="card flex-none w-full lg:max-w-lg drop-shadow-md border border-t-2">
                        <h1 className="text-center font-bold text-blue-500 text-xl">Log in</h1>
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
