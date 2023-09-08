//
//
//

import Card from "../Card";
import FormEditReservation from "../Forms/FormEditReservation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {FormProvider, useForm} from "react-hook-form";
import {useEffect, useRef} from "react";

const ModalReservationDetails = (props: any) => {
    //
    const {data, modalStatus, errorMessage, setErrorMessage, handleModalClick, refresh} = props;
    const ref = useRef<any>(null);

    const axiosPrivate = useAxiosPrivate();

    const methods = useForm({
        mode: "onChange",
    });

    const onSubmit = methods.handleSubmit(async (formdata) => {
        //
        try {
            const response = await axiosPrivate.post("/api/reservation/" + data.id, formdata);
            if (response) {
                setErrorMessage({
                    status: "success",
                    message: "Success! Reservation has been changed successfully.",
                });
                handleModalClick && handleModalClick();
                refresh && refresh();
            }
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage({status: "error", message: "No Server Response."});
            } else {
                setErrorMessage({status: "error", message: "Internal Server Error. Please contact support."});
            }
        }

        setTimeout(() => {
            setErrorMessage({status: "", message: ""});
        }, 5000);
    });

    useEffect(() => {
        const checkIfClickedOutside = (e: Event) => {
            if (!ref.current) {
                return;
            }

            if (!ref.current.contains(e.target)) {
                handleModalClick && handleModalClick();
            }
        };

        document.addEventListener("click", checkIfClickedOutside, true);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, [modalStatus]);

    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 max-w-screen max-w-screen w-full h-full">
            <div className="flex justify-center items-center w-full h-full relative">
                <Card className="w-full max-w-md lg:max-w-2xl p-0" ref={ref}>
                    <div className="flex flex-col items-center">
                        <FormProvider {...methods}>
                            <FormEditReservation
                                data={data}
                                handleModalClick={handleModalClick}
                                isDirty={methods.formState.isDirty}
                                onSubmit={onSubmit}
                            />
                        </FormProvider>
                    </div>
                </Card>
                {errorMessage.status && errorMessage.status === "error" && (
                    <span className={`bg-red-300 px-4 py-1 absolute top-10 right-10 rounded-md border border-red-500`}>
                        {errorMessage.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ModalReservationDetails;
