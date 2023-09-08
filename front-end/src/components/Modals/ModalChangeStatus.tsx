//
//
//

import Card from "../Card";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useEffect, useRef} from "react";
import {format} from "date-fns";

interface ModalChangeStatusProps {
    data: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        contact_no: string;
        status: string;
        date: Date;
        time: string;
    };
    newStatus: string;
    modalStatus: boolean;
    errorMessage: {status: string; message: string};
    setErrorMessage: React.Dispatch<React.SetStateAction<{status: string; message: string}>>;
    handleCloseModal: () => void;
    refresh?: () => void;
}

const ModalChangeStatus = (props: any) => {
    //
    const {data, newStatus, modalStatus, errorMessage, setErrorMessage, handleCloseModal, refresh} = props;
    const ref = useRef<any>(null);

    const axiosPrivate = useAxiosPrivate();

    const handleClickUpdate = async () => {
        try {
            const response = await axiosPrivate.post("/api/reservation/" + data.id, {status: newStatus});
            if (response) {
                setErrorMessage({
                    status: "success",
                    message: "Success! Reservation has been changed successfully.",
                });
                handleCloseModal && handleCloseModal();
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
    };

    const handleClickCancel = () => {
        handleCloseModal && handleCloseModal();
    };

    useEffect(() => {
        //
        const checkIfClickedOutside = (e: Event) => {
            if (!ref.current) {
                return;
            }

            if (!ref.current.contains(e.target)) {
                handleCloseModal && handleCloseModal();
            }
        };

        //
        document.addEventListener("click", checkIfClickedOutside, true);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, [modalStatus]);

    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 max-w-screen max-w-screen w-full h-full">
            <div className="flex justify-center items-center w-full h-full relative">
                <Card className="max-w-md lg:max-w-xl p-2">
                    <div className="flex flex-col items-center">
                        <div className="bg-red-100 flex flex-col justify-center p-0 rounded">
                            <div className="bg-white grid grid-cols-3 justify-items-center">
                                <div className="col-span-3 w-full text-center py-2">
                                    <span className="text-2xl py-2 text-blue-500">Reservation Details</span>
                                </div>
                                {/* Full Name */}
                                <div className="px-1 w-full">
                                    <strong>Full Name:</strong>
                                </div>
                                <div className="col-span-2 w-full text-center px-2">
                                    <span>
                                        {data.first_name} {data.last_name}
                                    </span>
                                </div>
                                {/* Date */}
                                <div className="px-1 w-full">
                                    <strong>Date:</strong>
                                </div>
                                <div className="col-span-2 w-full text-center px-2">
                                    <span>{format(new Date(data.date), "MMM dd, yyyy")}</span>
                                </div>
                                {/* Time */}
                                <div className="px-1 w-full">
                                    <strong>Time:</strong>
                                </div>
                                <div className="col-span-2 w-full text-center px-2">
                                    <span>{format(new Date(`2000-01-01 ${data.time}`), "h:mm a")}</span>
                                </div>
                                {/* Status */}
                                <div className="px-1 w-full">
                                    <strong>Status:</strong>
                                </div>
                                <div className="col-span-2 w-full text-center px-2">
                                    <span className="bg-red-300 rounded-full px-2">
                                        {data.status} ={">"} {newStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="py-2">Are you sure you want to change the status of this reservation?</span>
                        <div className="flex space-x-2">
                            <button
                                className="px-3 py-1 bg-green-500 rounded-full w-24 text-white"
                                onClick={handleClickUpdate}
                            >
                                Update
                            </button>
                            <button
                                className="px-3 py-1 bg-red-500 rounded-full w-24 text-white"
                                onClick={handleClickCancel}
                            >
                                Cancel
                            </button>
                        </div>
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

export default ModalChangeStatus;
