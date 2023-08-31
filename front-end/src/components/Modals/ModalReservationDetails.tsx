//
//
//

import Card from "../Card";
import FormEditReservation from "../Forms/FormEditReservation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

interface FormReservationDetailsProps {
    //
    data: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        contact_no: string;
        date: Date;
        time: string;
    };
    modalStatus: boolean;
    setErrorMessage: React.Dispatch<React.SetStateAction<{ status: string; message: string }>>;
    handleModalClick?: () => void;
}

const ModalReservationDetails = ({ data, modalStatus, setErrorMessage, handleModalClick }: FormReservationDetailsProps) => {
    //
    const ref = useRef<any>();
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

    useEffect(() => {
        const checkIfClickedOutside = (e: Event) => {
            if (!ref.current) {
                return;
            }

            if (!ref.current.contains(e.target)) {
                handleModalClick && handleModalClick();
            }
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("click", checkIfClickedOutside, true);
        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, [modalStatus]);

    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 max-w-screen max-w-screen w-full h-full">
            <div className="flex justify-center items-center w-full h-full">
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
            </div>
        </div>
    );
};

export default ModalReservationDetails;
