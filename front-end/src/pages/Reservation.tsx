//
//
//

import { Link } from "react-router-dom";
import FormSchedule from "../components/Forms/FormSchedule";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const Reservation = () => {
    //
    const [user, setUser] = useState();
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => {
        console.log(data);
        // axiosAuth.post("http://localhost:5000/auth/login", data).then((response) => {
        //     console.log(response);
        //     window.location.href = "/";
        // });
    });

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axiosAuth.get("/users", {
    //                 signal: controller.signal,
    //             });
    //             console.log(response.data);
    //             isMounted && setUser(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     getUsers();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     };
    // }, []);

    return (
        <>
            <div className="container mx-auto min-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-3.5rem)] h-full lg:h-screen">
                <div className="flex h-full">
                    <div
                        className="flex flex-col lg:flex-row w-full h-full mx-auto lg:w-3/4 lg:h-3/4 lg:my-auto lg:items-center lg:rounded-2xl shadow-xl
                    ring-2 ring-black/5"
                    >
                        {/* Form */}
                        <div className="flex w-full h-full justify-center lg:rounded-l-2xl py-2">
                            <FormProvider {...methods}>
                                <FormSchedule onSubmit={onSubmit} />
                            </FormProvider>
                        </div>
                        {/* Design */}
                        <div
                            className="flex lg:flex-col justify-center items-center w-full h-52 lg:h-full relative bg-blue-500 lg:bg-transparent lg:p-12 shrink-0 lg:shrink
                    bg-gradient-to-l from-cyan-500 to-blue-500 lg:rounded-r-2xl"
                        >
                            <div className="flex flex-col gap-2 w-full md:w-3/4 mx-6 lg:mx-0 py-2 lg:py-12 rounded-full bg-white shadow-md">
                                <div className="flex w-full">
                                    <h1 className="font-bold text-blue-600 my-auto mx-auto md:text-2xl">
                                        <p className="text-center">Simple Reservation Web App</p>
                                    </h1>
                                </div>
                                <div className="">
                                    <p className="text-center">
                                        <Link to="/login" className="underline">
                                            Login
                                        </Link>{" "}
                                        to view Dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reservation;
